import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('easy-gpt-root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
