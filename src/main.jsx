import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Since html can't access env variables, set html head title here.
const title = document.querySelector('title');
title.textContent = import.meta.env.VITE_BLOG_TITLE;
