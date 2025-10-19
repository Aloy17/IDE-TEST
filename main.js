const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs').promises;

let mainWindow;

// Get user projects folder
function getProjectsFolder() {
  const userDataPath = app.getPath('userData');
  return path.join(userDataPath, 'projects');
}

// Create main window
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

  // Open DevTools in development
  // mainWindow.webContents.openDevTools();
}

// Initialize projects folder
async function initializeProjectsFolder() {
  const projectsPath = getProjectsFolder();
  
  try {
    await fs.access(projectsPath);
  } catch {
    // Create folder if doesn't exist
    await fs.mkdir(projectsPath, { recursive: true });
    
    // Copy example files
    const examplesSource = path.join(__dirname, 'backend', 'examples');
    try {
      const files = await fs.readdir(examplesSource);
      for (const file of files) {
        if (file.endsWith('.rid')) {
          const sourcePath = path.join(examplesSource, file);
          const destPath = path.join(projectsPath, file);
          await fs.copyFile(sourcePath, destPath);
        }
      }
    } catch (err) {
      console.error('Error copying example files:', err);
    }
  }
}

// Execute RID code
async function executeRID(code) {
  return new Promise((resolve) => {
    const pythonScript = path.join(__dirname, 'backend', 'rid_backend.py');
    const pythonProcess = spawn('python', [pythonScript]);
    
    let output = '';
    let errorOutput = '';
    
    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });
    
    pythonProcess.on('close', (code) => {
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
    
    pythonProcess.on('error', (err) => {
      resolve({
        success: false,
        error: `Failed to start Python: ${err.message}`
      });
    });
    
    // Send code to Python
    pythonProcess.stdin.write(code);
    pythonProcess.stdin.end();
  });
}

// IPC Handlers
ipcMain.handle('execute-rid', async (event, code) => {
  return await executeRID(code);
});

ipcMain.handle('get-files', async () => {
  const projectsPath = getProjectsFolder();
  try {
    const files = await fs.readdir(projectsPath);
    return files.filter(f => f.endsWith('.rid'));
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

// App lifecycle
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
