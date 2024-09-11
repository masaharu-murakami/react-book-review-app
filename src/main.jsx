import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store'; // ストアのインポート
import './index.css'; // 必要に応じてスタイルシートをインポート

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store}> {/* ストアを Provider でラップ */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);