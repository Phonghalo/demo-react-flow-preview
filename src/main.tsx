import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@xyflow/react/dist/style.css';
import './index.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Optional: <App labels={{ appTitle: 'My demo', ... }} /> — see src/demoLabels.ts */}
    <App />
  </StrictMode>,
);
