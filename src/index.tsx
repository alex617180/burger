import React, { type ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app.jsx';
import ModalHost from './components/modal/modal-host.jsx';
import NotificationsHost from './components/notifications/notifications-host.jsx';
import reportWebVitals from './reportWebVitals';

const renderInStrictMode = (element: ReactNode) => <React.StrictMode>{element}</React.StrictMode>;

const mount = (containerId: string, element: ReactNode) => {
  const container = document.getElementById(containerId);
  if (!container) {
    return;
  }

  ReactDOM.createRoot(container).render(renderInStrictMode(element));
};

mount('root', <App />);
mount('react-modals', <ModalHost />);
mount('react-notifications', <NotificationsHost />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
