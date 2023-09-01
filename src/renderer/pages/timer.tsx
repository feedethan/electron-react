import { useState } from 'react';
import { useCountDown } from 'ahooks';

function Timer() {
  const [targetDate, setTargetDate] = useState<number>();

  const startWork = () => {
    setTargetDate(Date.now() + 5 * 1000);
  };
  const noti = async () => {
    const val = await window.electronAPI.ipcRenderer.invoke(
      'notification:timer'
    );
    if (val === 'rest') {
      alert('休息');
    }
    if (val === 'work') {
      startWork();
    }
  };
  const [countdown] = useCountDown({
    targetDate,
    onEnd: () => {
      noti();
    },
  });

  return (
    <div>
      <button onClick={startWork} disabled={countdown !== 0}>
        {countdown === 0
          ? 'Start Work'
          : `Rest After ${Math.round(countdown / 1000)}s`}
      </button>
      <button
        onClick={() => {
          setTargetDate(undefined);
        }}
        style={{ marginLeft: 8 }}
      >
        Stop
      </button>
    </div>
  );
}

export default Timer;
