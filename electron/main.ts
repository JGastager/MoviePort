import path from "node:path";
import { fileURLToPath } from "node:url";
import { app, BrowserWindow, ipcMain } from "electron";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow: BrowserWindow | null;

app.commandLine.appendSwitch("enable-features", "FluentOverlayScrollbar,FluentScrollbar");

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 1600,
        height: 960,
        minWidth: 1280,
        minHeight: 720,
        frame: false, // Remove default title bar
        icon: path.join(__dirname, "../public/logo.ico"), // Set your icon path here
        title: "MoviePort",
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);

    mainWindow.on("closed", () => {
        mainWindow = null;
    });

    // Send window state updates
    mainWindow.on("maximize", () => mainWindow?.webContents.send("window-state", "maximized"));
    mainWindow.on("unmaximize", () => mainWindow?.webContents.send("window-state", "normal"));
});

// Window controls
ipcMain.on("window:minimize", () => mainWindow?.minimize());
ipcMain.on("window:maximize", () => mainWindow?.maximize());
ipcMain.on("window:restore", () => mainWindow?.unmaximize());
ipcMain.on("window:close", () => mainWindow?.close());
