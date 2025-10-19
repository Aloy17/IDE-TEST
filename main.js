const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs').promises;

let mainWindow;

function getProjectsFolder() {
  const userDataPath = app.getPath('userData');
  return path.join(userDataPath, 'projects');
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    backgroundColor: '#0a0014',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'src', 'assets', 'icon.png')
  });

  mainWindow.loadFile('src/index.html');
  Menu.setApplicationMenu(null);
}

async function initializeProjectsFolder() {
  const projectsPath = getProjectsFolder();
  
  try {
    await fs.access(projectsPath);
  } catch {
    await fs.mkdir(projectsPath, { recursive: true });
    
    const examplesPath = app.isPackaged
      ? path.join(process.resourcesPath, 'examples')
      : path.join(__dirname, 'backend', 'examples');
    try {
      const files = await fs.readdir(examplesPath);
      for (const file of files) {
        if (file.endsWith('.rid')) {
          const sourcePath = path.join(examplesPath, file);
          const destPath = path.join(projectsPath, file);
          await fs.copyFile(sourcePath, destPath);
        }
      }
    } catch (err) {
      console.error('Error copying example files:', err);
    }
  }
}

async function executeRID(code) {
  return new Promise((resolve) => {
    let ridProcess;
    
    if (app.isPackaged) {
      const exePath = path.join(process.resourcesPath, 'rid_backend.exe');
      ridProcess = spawn(exePath);
    } else {
      const pythonScript = path.join(__dirname, 'backend', 'rid_backend.py');
      ridProcess = spawn('python', [pythonScript]);
    }
    
    let output = '';
    let errorOutput = '';
    
    ridProcess.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    ridProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });
    
    ridProcess.on('close', (code) => {
      if (code !== 0 && errorOutput) {
        resolve({
          success: false,
          error: errorOutput
        });
      } else {
        try {
          const result = JSON.parse(output);
          resolve(result);
        } catch (e) {
          resolve({
            success: false,
            error: 'Failed to parse execution result'
          });
        }
      }
    });
    
    ridProcess.on('error', (err) => {
      resolve({
        success: false,
        error: `Failed to start RID backend: ${err.message}`
      });
    });
    
    ridProcess.stdin.write(code);
    ridProcess.stdin.end();
  });
}

ipcMain.handle('execute-rid', async (event, code) => {
  return await executeRID(code);
});

ipcMain.handle('get-files', async (event, subPath = '') => {
  const projectsPath = getProjectsFolder();
  const fullPath = path.join(projectsPath, subPath);
  
  try {
    const items = await fs.readdir(fullPath, { withFileTypes: true });
    const result = [];
    
    for (const item of items) {
      const itemPath = subPath ? path.join(subPath, item.name) : item.name;
      result.push({
        name: item.name,
        path: itemPath,
        isDirectory: item.isDirectory()
      });
    }
    
    return result;
  } catch (err) {
    return [];
  }
});

ipcMain.handle('load-file', async (event, filename) => {
  const filePath = path.join(getProjectsFolder(), filename);
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return { success: true, content };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

ipcMain.handle('save-file', async (event, filename, content) => {
  const filePath = path.join(getProjectsFolder(), filename);
  try {
    await fs.writeFile(filePath, content, 'utf-8');
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

ipcMain.handle('save-file-dialog', async (event, content) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    defaultPath: path.join(getProjectsFolder(), 'untitled.rid'),
    filters: [
      { name: 'RID Files', extensions: ['rid'] }
    ]
  });
  
  if (result.canceled) {
    return { success: false, canceled: true };
  }
  
  try {
    await fs.writeFile(result.filePath, content, 'utf-8');
    const filename = path.basename(result.filePath);
    return { success: true, filename };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

ipcMain.handle('delete-file', async (event, filename) => {
  const filePath = path.join(getProjectsFolder(), filename);
  try {
    await fs.unlink(filePath);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

ipcMain.handle('create-folder', async (event, folderName) => {
  const folderPath = path.join(getProjectsFolder(), folderName);
  try {
    await fs.mkdir(folderPath, { recursive: true });
    return { success: true, folderName };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

ipcMain.handle('move-file', async (event, sourcePath, targetFolderPath) => {
  try {
    const projectsFolder = getProjectsFolder();
    const fullSourcePath = path.join(projectsFolder, sourcePath);
    const fullTargetFolder = path.join(projectsFolder, targetFolderPath);
    
    const itemName = path.basename(sourcePath);
    const fullTargetPath = path.join(fullTargetFolder, itemName);
    
    const sourceStats = await fs.stat(fullSourcePath);
    await fs.mkdir(fullTargetFolder, { recursive: true });
    await fs.rename(fullSourcePath, fullTargetPath);
    
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
});
app.whenReady().then(async () => {
  await initializeProjectsFolder();
  createWindow();
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
