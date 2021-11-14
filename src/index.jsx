import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import './style/style.scss';
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

