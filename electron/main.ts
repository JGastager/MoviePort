import { app, BrowserWindow } from 'electron'

app.whenReady().then(() => {
  new BrowserWindow({ icon: './public/logo.ico' }).loadURL(process.env.VITE_DEV_SERVER_URL)
})
