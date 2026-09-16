import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Демо на GitHub Pages (npm run build:demo) живёт в подпапке и без серверных
// переписываний — там используем HashRouter; локально и на своём хостинге —
// чистые URL через BrowserRouter.
const UseHash = import.meta.env.MODE === 'demo';
const Router = UseHash ? HashRouter : BrowserRouter;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
);
