<img src=".erb/img/erb-banner.svg" width="100%" />

<br>

<p>
  Electron React Boilerplate uses <a href="https://electron.atom.io/">Electron</a>, <a href="https://facebook.github.io/react/">React</a>, <a href="https://github.com/reactjs/react-router">React Router</a>, <a href="https://webpack.js.org/">Webpack</a> and <a href="https://www.npmjs.com/package/react-refresh">React Fast Refresh</a>.
</p>

<br>

<div align="center">

[![Build Status][github-actions-status]][github-actions-url]
[![Github Tag][github-tag-image]][github-tag-url]
[![Discord](https://badgen.net/badge/icon/discord?icon=discord&label)](https://discord.gg/Fjy3vfgy5q)

[![OpenCollective](https://opencollective.com/electron-react-boilerplate-594/backers/badge.svg)](#backers)
[![OpenCollective](https://opencollective.com/electron-react-boilerplate-594/sponsors/badge.svg)](#sponsors)
[![StackOverflow][stackoverflow-img]][stackoverflow-url]

</div>

## Install

Clone the repo and install dependencies:

```bash
git clone --depth 1 --branch main https://github.com/electron-react-boilerplate/electron-react-boilerplate.git your-project-name
cd your-project-name
npm install
```

**Having issues installing? See our [debugging guide](https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/400)**

## Starting Development

Start the app in the `dev` environment:

```bash
npm start
```

## Packaging for Production

To package apps for the local platform:

```bash
npm run package
```

## Docs

See our [docs and guides here](https://electron-react-boilerplate.js.org/docs/installation)

## Community

Join our Discord: https://discord.gg/Fjy3vfgy5q

## Sponsors

<a href="https://palette.dev">
  <img src=".erb/img/palette-sponsor-banner.svg" width="100%" />
</a>

## Donations

**Donations will ensure the following:**

- 🔨 Long term maintenance of the project
- 🛣 Progress on the [roadmap](https://electron-react-boilerplate.js.org/docs/roadmap)
- 🐛 Quick responses to bug reports and help requests

## 进程通信

### 单向通信：渲染进程=>主进程 `ipcRenderer.send() ipcMain.on()`

1. 注册 channel

```
// preload.ts

export type Channels = 'ipc-example' | 'ipc-send';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
```

2. 监听 channel

```
// main.ts

ipcMain.on('ipc-send', (event, title) => {
  console.log('main get ipc-send=======', title, event);
  // 拿到 附加到消息发送方的 BrowserWindow 实例
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  win.setTitle(title);
  // 旧的双向通信，返回到渲染进程
  event.reply('ipc-send', 'done!!!!!!!!!!!!');
});
```

3. 渲染进程监听回调(旧的双向通信不推荐)

```
window.electronAPI.ipcRenderer.on('ipc-send', (arg) => {
  console.log(33333333333333, arg);
});
```

### 单向通信：主进程=>渲染进程

https://www.electronjs.org/zh/docs/latest/tutorial/ipc#%E6%A8%A1%E5%BC%8F-3%E4%B8%BB%E8%BF%9B%E7%A8%8B%E5%88%B0%E6%B8%B2%E6%9F%93%E5%99%A8%E8%BF%9B%E7%A8%8B

### 双向通信 `ipcRenderer.invoke() ipcMain.handle()`

1. 注册 channel

```
// preload.ts

export type Channels = 'ipc-example' | 'ipc-send';

const electronHandler = {
  ipcRenderer: {
    invoke(channel: Channels) {
      return ipcRenderer.invoke(channel);
    },
```

2. 监听 channel

```
// main.ts

ipcMain.handle('dialog:openFile', handleFileOpen);
const handleFileOpen = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({});
  if (!canceled) {
    // 返回数据
    return filePaths[0];
  }
};
```

3. 渲染进程监听回调（推荐）

```
const handleOpenFile = async () => {
    const filePath = await window.electronAPI.ipcRenderer.invoke(
      'dialog:openFile'
    );
    console.log(11111, filePath);
  };
```

### 双向通信：渲染进程=>渲染进程

https://www.electronjs.org/zh/docs/latest/tutorial/message-ports
