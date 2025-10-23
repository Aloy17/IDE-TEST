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
    frame: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'src', 'assets', 'icon.png')
  });
  mainWindow.loadFile('src/index.html');
  Menu.setApplicationMenu(null);
  
  // Listen for maximize/unmaximize events
  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('window-maximized');
  });
  
  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('window-unmaximized');
  });
}
async function initializeProjectsFolder() {
  const projectsPath = getProjectsFolder();
  try {
    await fs.access(projectsPath);
  } catch {
    await fs.mkdir(projectsPath, { recursive: true });
  }
  
  // Remove unnecessary folders and files
  const unnecessaryFolders = ['hy', 'New Folder', 'random', 'stuff'];
  try {
    const items = await fs.readdir(projectsPath, { withFileTypes: true });
    for (const item of items) {
      if (item.isDirectory() && unnecessaryFolders.includes(item.name)) {
        const folderPath = path.join(projectsPath, item.name);
        try {
          await fs.rm(folderPath, { recursive: true, force: true });
          console.log(`Removed unnecessary folder: ${item.name}`);
        } catch (err) {
          console.error(`Error removing folder ${item.name}:`, err);
        }
      }
    }
  } catch (err) {
    console.error('Error cleaning up unnecessary folders:', err);
  }
  
  // Check if examples folder exists, if not create it and copy example files
  const examplesFolderPath = path.join(projectsPath, 'examples');
  try {
    await fs.access(examplesFolderPath);
  } catch {
    // Examples folder doesn't exist, create it and copy files
    await fs.mkdir(examplesFolderPath, { recursive: true });
    const examplesPath = app.isPackaged
      ? path.join(process.resourcesPath, 'examples')
      : path.join(__dirname, 'backend', 'examples');
    try {
      const files = await fs.readdir(examplesPath);
      for (const file of files) {
        if (file.endsWith('.rid')) {
          const sourcePath = path.join(examplesPath, file);
          const destPath = path.join(examplesFolderPath, file);
          await fs.copyFile(sourcePath, destPath);
        }
      }
    } catch (err) {
      console.error('Error copying example files:', err);
    }
  }
  
  // Clean up examples folder - remove files with 'test' or 'ryane' in their names
  try {
    const exampleFiles = await fs.readdir(examplesFolderPath, { withFileTypes: true });
    for (const file of exampleFiles) {
      if (!file.isDirectory() && file.name.endsWith('.rid')) {
        const fileName = file.name.toLowerCase();
        if (fileName.includes('test') || fileName.includes('ryane')) {
          const filePath = path.join(examplesFolderPath, file.name);
          try {
            await fs.unlink(filePath);
            console.log(`Removed test/ryane file: ${file.name}`);
          } catch (err) {
            console.error(`Error removing file ${file.name}:`, err);
          }
        }
      }
    }
  } catch (err) {
    console.error('Error cleaning up examples folder:', err);
  }
  
  // Migrate any existing .rid files from root to examples folder (excluding test/ryane files)
  try {
    const items = await fs.readdir(projectsPath, { withFileTypes: true });
    for (const item of items) {
      if (!item.isDirectory() && item.name.endsWith('.rid')) {
        const fileName = item.name.toLowerCase();
        if (!fileName.includes('test') && !fileName.includes('ryane')) {
          const sourcePath = path.join(projectsPath, item.name);
          const destPath = path.join(examplesFolderPath, item.name);
          try {
            await fs.access(destPath);
            // File already exists in examples, remove from root
            await fs.unlink(sourcePath);
          } catch {
            // File doesn't exist in examples, move it there
            await fs.rename(sourcePath, destPath);
          }
        } else {
          // Remove test/ryane files from root
          const sourcePath = path.join(projectsPath, item.name);
          try {
            await fs.unlink(sourcePath);
            console.log(`Removed test/ryane file from root: ${item.name}`);
          } catch (err) {
            console.error(`Error removing file ${item.name}:`, err);
          }
        }
      }
    }
  } catch (err) {
    console.error('Error migrating existing files:', err);
  }
}
let currentProcess = null;
async function executeRID(code) {
  return new Promise((resolve) => {
    let ridProcess;
    const codeBase64 = Buffer.from(code, 'utf-8').toString('base64');
    if (app.isPackaged) {
      const exePath = path.join(process.resourcesPath, 'rid_backend.exe');
      ridProcess = spawn(exePath, [codeBase64], { stdio: ['pipe', 'pipe', 'pipe'] });
    } else {
      const pythonScript = path.join(__dirname, 'backend', 'rid_backend.py');
      ridProcess = spawn('python', [pythonScript, codeBase64, '-u'], { stdio: ['pipe', 'pipe', 'pipe'] });
    }
    currentProcess = ridProcess;
    let output = '';
    let errorOutput = '';
    let stdoutClosed = false;
    let stderrClosed = false;
    let processExited = false;
    
    // 30 second timeout to force-kill hung processes
    const killTimeout = setTimeout(() => {
      if (currentProcess && !currentProcess.killed) {
        console.log('[FORCE KILLING HUNG PROCESS]');
        currentProcess.kill('SIGKILL');
        cleanup();
        resolve({
          success: false,
          error: 'Process execution timed out after 30 seconds'
        });
      }
    }, 30000);
    
    const cleanup = () => {
      clearTimeout(killTimeout);
      if (stdoutClosed && stderrClosed && processExited) {
        currentProcess = null;
      }
    };
    
    ridProcess.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    ridProcess.stdout.on('close', () => {
      stdoutClosed = true;
      cleanup();
    });
    
    ridProcess.stderr.on('data', (data) => {
      const stderrData = data.toString();
      console.log('[STDERR]:', stderrData);
      if (stderrData.includes('__RIDLEY_PROMPT__')) {
        console.log('[PROMPT DETECTED]');
        const promptMatch = stderrData.match(/__RIDLEY_PROMPT__(.+)/);
        if (promptMatch) {
          const prompt = promptMatch[1];
          console.log('[SENDING PROMPT TO RENDERER]:', prompt);
          mainWindow.webContents.send('input-prompt', prompt);
          return;
        }
      }
      errorOutput += stderrData;
    });
    
    ridProcess.stderr.on('close', () => {
      stderrClosed = true;
      cleanup();
    });
    
    ridProcess.on('close', (code) => {
      processExited = true;
      clearTimeout(killTimeout);
      cleanup();
      
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
      processExited = true;
      clearTimeout(killTimeout);
      cleanup();
      resolve({
        success: false,
        error: `Failed to start RID backend: ${err.message}`
      });
    });
  });
}
ipcMain.on('send-input', (event, userInput) => {
  if (currentProcess && !currentProcess.killed) {
    try {
      currentProcess.stdin.write(userInput + '\n');
    } catch (err) {
      console.error('[ERROR WRITING TO STDIN]:', err);
    }
  }
});
ipcMain.on('minimize-window', () => {
  if (mainWindow) mainWindow.minimize();
});
ipcMain.on('maximize-window', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});
ipcMain.on('close-window', () => {
  if (mainWindow) mainWindow.close();
});
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