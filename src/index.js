import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Buffer } from 'buffer';

// Add Buffer to the global scope
globalThis.Buffer = Buffer;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);