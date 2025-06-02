import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './context/UserContext.tsx';

createRoot(document.getElementById('root')!).render(
    <Router>
      <UserProvider>
        <App />
      </UserProvider>
    </Router>
)
