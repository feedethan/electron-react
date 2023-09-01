function StoreDemo() {
  const handleStoreGet = (key: string) => {
    const v = window.electronAPI.store.get(key);
    console.log(v);
  };
  const handleStoreSet = () => {
    window.electronAPI.store.set('foo', 'bar');
  };
  return (
    <div className="Hello">
      <button type="button" onClick={() => handleStoreGet('foo')}>
        store get
      </button>
      <button type="button" onClick={handleStoreSet}>
        store set
      </button>
    </div>
  );
}

export default StoreDemo;
