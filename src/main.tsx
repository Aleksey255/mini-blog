import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import './index.css'
import App from './App.tsx'
import { SnackbarProvider } from 'notistack'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnackbarProvider>
      <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </SnackbarProvider>
  </StrictMode>
)
