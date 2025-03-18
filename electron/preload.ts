// eslint-disable-next-line @typescript-eslint/no-require-imports
const { contextBridge, ipcRenderer } = require("electron"); // electron needs require syntax

contextBridge.exposeInMainWorld("electron", {
    minimize: () => ipcRenderer.send("window:minimize"),
    maximize: () => ipcRenderer.send("window:maximize"),
    restore: () => ipcRenderer.send("window:restore"),
    close: () => ipcRenderer.send("window:close"),
    onWindowStateChange: (callback: (state: unknown) => void) => ipcRenderer.on("window-state", (_, state) => callback(state)),
});
