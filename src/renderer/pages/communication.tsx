import './App.css';

function Home() {
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

  return (
    <div>
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

export default Home;
