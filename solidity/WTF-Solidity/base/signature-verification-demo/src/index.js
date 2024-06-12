import React from 'react'
import { createRoot } from 'react-dom/client';
import './index.css'
import App from './App'

// 找到你的根元素
const container = document.getElementById('root');
// 使用createRoot创建一个root
const root = createRoot(container);
// 使用root.render来渲染你的应用
root.render(<App />);
