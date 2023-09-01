import { BrowserWindow, ipcMain, nativeTheme } from 'electron';

import { sendControlText, createWindow } from './main';
import DataStore from './store';

import { showNotification, handleFileOpen, handleTimerNoti } from './util';

export default function handleIPC() {
  ipcMain.handle('dialog:openFile', handleFileOpen);
  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light';
    } else {
      nativeTheme.themeSource = 'dark';
    }
    return nativeTheme.shouldUseDarkColors;
  });
  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system';
  });
  ipcMain.on('notification:success', (event, obj) => {
    const [title, body] = obj;
    showNotification(title, body);
  });
  ipcMain.on('ipc-example', async (event, arg) => {
    const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
    console.log(`main get ipc-example=====${msgTemplate(arg)}`);
    event.reply('ipc-example', msgTemplate('33333333333333333pong'));
  });

  ipcMain.on('ipc-send', (event, title) => {
    console.log('main get ipc-send=======', title, event);
    // 拿到 附加到消息发送方的 BrowserWindow 实例
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    win?.setTitle(title);
    // 返回信息
    event.reply('ipc-send', 'done!!!!!!!!!!!!');
  });

  ipcMain.on('electron-store-get', async (event, val) => {
    event.returnValue = DataStore.get(val);
  });
  ipcMain.on('electron-store-set', async (event, key, val) => {
    DataStore.set(key, val);
  });

  ipcMain.handle('notification:timer', handleTimerNoti);

  ipcMain.handle('control:login', () => {
    // mock一个六位随机数
    const code = Math.floor(Math.random() * 999999 - 100000) + 100000;
    return code;
  });
  ipcMain.on('control:start', async (event, arg) => {
    const [remoteCode] = arg;
    sendControlText('control:state-change', remoteCode, 1);
    // createWindow();
  });
}
