import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./Context/AuthContext"
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* Bọc App trong AuthProvider */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
