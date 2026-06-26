import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme'
import { AdminProvider } from './context/AdminContext'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AdminProvider>
        <App />
      </AdminProvider>
    </ThemeProvider>
  </StrictMode>
)