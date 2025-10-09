import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/app/app.jsx';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
      <div id="react-modals" />
      <div id="react-notifications" />
    </React.StrictMode>
  );
}

reportWebVitals();
