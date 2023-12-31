/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import { Notification, dialog, BrowserWindow } from 'electron';

function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

function showNotification(title: string, body: string) {
  new Notification({
    title,
    body,
  }).show();
}

function handleTimerNoti() {
  return new Promise((resolve, reject) => {
    const noti = new Notification({
      title: '任务结束',
      body: '是否开始休息？',
      actions: [
        {
          text: '开始休息',
          type: 'button',
        },
      ],
      closeButtonText: '继续工作',
    });
    noti.show();
    noti.on('action', () => {
      resolve('rest');
    });
    noti.on('close', () => {
      resolve('work');
    });
  });
}

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({});
  if (!canceled) {
    return filePaths[0];
  }
}

class AppWindow extends BrowserWindow {
  constructor(config: any, loadFile: string, debug: boolean = false) {
    const defaultConfig = {
      width: 1000,
      height: 800,
      webPreferences: {
        // node支持
        nodeIntegration: true,
        preload: path.join(__dirname, 'preload.js'),
      },
      backgroundColor: '#bababa',
    };
    const useConfig = { ...defaultConfig, ...config };

    super(useConfig);
    if (loadFile) {
      this.loadFile(loadFile);
    }
    if (debug) {
      this.webContents.openDevTools();
    }
  }
}

function createAppWindow(config: any, loadFile: string, debug: boolean) {
  return new AppWindow(config, loadFile, debug);
}

export {
  resolveHtmlPath,
  showNotification,
  handleTimerNoti,
  handleFileOpen,
  createAppWindow,
};
