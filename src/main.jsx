import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { initLocalStorageData } from './pages/data/initData.js'
import App from './App.jsx'

// Add Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas, fab);
// Initialize data
initLocalStorageData();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
