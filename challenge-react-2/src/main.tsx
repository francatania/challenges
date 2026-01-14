import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/authContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { SpentProvider } from './context/spentContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <AuthProvider>
          <SpentProvider>
            <App />
          </SpentProvider>
        </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
