import React, { useState } from 'react';

function Theme() {
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

  return (
    <div>
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
  );
}

export default Theme;
