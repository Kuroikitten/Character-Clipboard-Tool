const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs').promises;

let mainWindow;
const configPath = path.join(app.getPath('userData'), 'config.json');

async function loadConfig() {
    try {
        const data = await fs.readFile(configPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return { folderPath: null };
    }
}

async function saveConfig(config) {
    try {
        await fs.writeFile(configPath, JSON.stringify(config, null, 2));
    } catch (err) {
        console.error('Error saving config:', err);
    }
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true,
            webSecurity: true,
            allowRunningInsecureContent: false,
            enableRemoteModule: false,
            nodeIntegrationInWorker: false,
            nodeIntegrationInSubFrames: false
        },
        icon: path.join(__dirname, 'icon.png')
    });

    // Block all network requests
    mainWindow.webContents.session.webRequest.onBeforeRequest((details, callback) => {
        // Allow only local file:// protocol and blob:// for images
        if (details.url.startsWith('file://') || details.url.startsWith('blob:') || details.url.startsWith('data:')) {
            callback({});
        } else {
            console.log('Blocked network request:', details.url);
            callback({ cancel: true });
        }
    });

    // Disable navigation to external URLs
    mainWindow.webContents.on('will-navigate', (event, url) => {
        if (!url.startsWith('file://')) {
            event.preventDefault();
        }
    });

    // Block new window creation
    mainWindow.webContents.setWindowOpenHandler(() => {
        return { action: 'deny' };
    });

    mainWindow.loadFile('index.html');
}

app.whenReady().then(async () => {
    createWindow();
    
    // Load saved folder path on startup
    const config = await loadConfig();
    if (config.folderPath) {
        mainWindow.webContents.on('did-finish-load', () => {
            mainWindow.webContents.send('saved-folder-path', config.folderPath);
        });
    }

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

// Handle folder selection
ipcMain.handle('select-folder', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory']
    });
    
    if (!result.canceled && result.filePaths.length > 0) {
        const folderPath = result.filePaths[0];
        await saveConfig({ folderPath });
        return folderPath;
    }
    return null;
});

// Handle reading folder contents
ipcMain.handle('read-folder', async (event, folderPath) => {
    try {
        const files = await fs.readdir(folderPath);
        const pngFiles = files.filter(f => f.toLowerCase().endsWith('.png'));
        
        const fileDataPromises = pngFiles.map(async (filename) => {
            const filePath = path.join(folderPath, filename);
            const buffer = await fs.readFile(filePath);
            return {
                name: filename,
                data: buffer.toString('base64')
            };
        });
        
        return await Promise.all(fileDataPromises);
    } catch (err) {
        console.error('Error reading folder:', err);
        return [];
    }
});