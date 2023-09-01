import React, { FC, useState, useEffect, useRef } from 'react';

interface IProps {}

const RemoteControl: FC<IProps> = (props) => {
  const [remoteCode, setRemoteCode] = useState('');
  const [localCode, setLocalCode] = useState('');
  const [status, setStatus] = useState('');

  const videoRef = useRef();

  const login = async () => {
    // 从主进程获取code
    const code = await window.electronAPI.ipcRenderer.invoke('control:login');
    setLocalCode(code);
  };

  useEffect(() => {
    login();
    // 监听主子通信
    window.electronAPI.ipcRenderer.on(
      'control:state-change',
      handleControlState
    );
  }, []);
  const handleControlState = (name, type) => {
    console.log(111, name, type);

    let text = '';
    if (type === 1) {
      text = `正在控制${name}`;
    } else if (type === 2) {
      text = `被${name}控制`;
    }
    setStatus(text);
  };
  const startControl = () => {
    // 单向通信
    window.electronAPI.ipcRenderer.sendMessage('control:start', [remoteCode]);
    // 捕获桌面流
    window.electronAPI.ipcRenderer.on('SET_SOURCE', async (sourceId) => {
      if (sourceId) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
              mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: sourceId,
                minWidth: 1280,
                maxWidth: 1280,
                minHeight: 720,
                maxHeight: 720,
              },
            },
          });
          handleStream(stream);
        } catch (e) {
          handleError(e);
        }
      }
    });
  };
  function handleStream(stream) {
    videoRef.current.srcObject = stream;
    videoRef.current.onloadedmetadata = (e) => videoRef.current.play();
  }

  function handleError(e) {
    console.log(e);
  }

  return (
    <div>
      {status === '' ? (
        <>
          <h3>你的控制码{localCode}</h3>
          <input
            type="text"
            value={remoteCode}
            onChange={(e) => setRemoteCode(e.target.value)}
          />
          <button onClick={startControl}>确认</button>
        </>
      ) : (
        <div>{status}</div>
      )}
      <video ref={videoRef} />
    </div>
  );
};

export default RemoteControl;
