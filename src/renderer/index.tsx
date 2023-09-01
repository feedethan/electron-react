import { createRoot } from 'react-dom/client';
import AppRoutes from './routes';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(<AppRoutes />);
