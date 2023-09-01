import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Wrap from './pages/wrap';
import Communication from './pages/communication';
import Timer from './pages/timer';
import StoreDemo from './pages/store-demo';
import RemoteControl from './pages/remote-control';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Wrap />}>
          <Route path="home" element={<Communication />} />
          <Route path="store" element={<StoreDemo />} />
          <Route path="timer" element={<Timer />} />
          <Route path="remote-control" element={<RemoteControl />} />
        </Route>
      </Routes>
    </Router>
  );
}
