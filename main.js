const { app, BrowserWindow, session } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  // Intercept CSP headers
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const headers = Object.assign({}, details.responseHeaders);
    delete headers['content-security-policy'];
    callback({ cancel: false, responseHeaders: headers });
  });

  win.loadURL('https://chat.openai.com/')
    .then(() => {
      console.log("URL loaded successfully");
    })
    .catch(err => {
      console.error("Failed to load URL: ", err);
    });

  win.webContents.on('did-finish-load', () => {
    console.log('Page loaded');
    //win.webContents.openDevTools(); // Open DevTools for debugging
  });

  win.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.error('Page failed to load: ', validatedURL, errorDescription);
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
