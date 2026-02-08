import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Providers from './providers'
import { Outlet } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Providers>
      <Outlet />
    </Providers>
  </StrictMode>,
)
