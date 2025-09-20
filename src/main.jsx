import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// 启动 mock 服务
import('./api/mock');

ReactDOM.createRoot(document.getElementById('root')).render(<App />);