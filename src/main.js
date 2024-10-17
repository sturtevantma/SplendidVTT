//main.js
const { app, BrowserWindow } = require('electron');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 300,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    mainWindow.loadFile('main_screen/index.html');

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
    // if (process.platform !== 'darwin') <===== Standard Apple Convention would keep the app running after all windows are closed
    app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});
