import { useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';

function Hello() {
  const handleSend = () => {
    window.electronAPI.ipcRenderer.sendMessage('ipc-send', 'NEW TITLE');
    // 监听返回
    window.electronAPI.ipcRenderer.on('ipc-send', (m) => {
      console.log(m);
    });
  };
  const handleOpenFile = async () => {
    const filePath = await window.electronAPI.ipcRenderer.invoke(
      'dialog:openFile'
    );
    console.log(11111, filePath);
  };
  const handleNoti = () => {
    window.electronAPI.ipcRenderer.sendMessage('notification:success', [
      'title',
      'body',
    ]);
  };
  const [theme, setTheme] = useState('');
  const handleToggle = async () => {
    const isDarkMode = await window.electronAPI.ipcRenderer.invoke(
      'dark-mode:toggle'
    );
    const s = isDarkMode ? 'Dark' : 'Light';
    setTheme(s);
  };
  const handleReset = async () => {
    await window.electronAPI.ipcRenderer.invoke('dark-mode:system');
    setTheme('System');
  };
  const handleStoreGet = (key: string) => {
    const v = window.electronAPI.store.get(key);
    console.log(v);
  };
  const handleStoreSet = () => {
    window.electronAPI.store.set('foo', 'bar');
  };
  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <p>
          Current theme source: <strong>{theme}</strong>
        </p>

        <button type="button" onClick={handleToggle}>
          切换主题
        </button>
        <button type="button" onClick={handleReset}>
          使用系统主题
        </button>
      </div>
      <div className="Hello">
        <button type="button" onClick={() => handleStoreGet('foo')}>
          store get
        </button>
        <button type="button" onClick={handleStoreSet}>
          store set
        </button>
      </div>
      <div className="Hello">
        <button type="button" onClick={handleSend}>
          单向通信-改变title
        </button>

        <button type="button" onClick={handleNoti}>
          单向通信-调用通知
        </button>
        <button type="button" onClick={handleOpenFile}>
          双向通信-选择文件
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
