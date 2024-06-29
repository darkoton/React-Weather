import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '@/assets/style/main.scss';
import { register } from 'swiper/element/bundle';
import router from '@/router/index';
register();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App router={router()}></App>
  </React.StrictMode>,
);
