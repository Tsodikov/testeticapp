import React from 'react';
// import ReactDOM from 'react-dom/client';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./components/Landing/style/flexboxgrid.min.css";
import './components/Landing/style/index.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../src/store/store.js';
import App from './app/App.js';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </React.StrictMode>
);
