import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAdmin } from './context/AdminContext'
import { Box } from '@mui/material'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Login from './views/Login'
import Dashboard from './views/Dashboard'
import ListaClientes from './views/ListaClientes'
import DetalleCliente from './views/DetalleCliente'
import FormularioAlta from './components/common/FormularioAlta'

const RutaProtegida = ({ children }) => {
  const { admin } = useAdmin()
  return admin ? children : <Navigate to="/login" />
}

const App = () => {
  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />

        <Box sx={{ flex: 1 }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <RutaProtegida>
                <Dashboard />
              </RutaProtegida>
            } />
            <Route path="/clientes" element={
              <RutaProtegida>
                <ListaClientes />
              </RutaProtegida>
            } />
            <Route path="/clientes/nuevo" element={
              <RutaProtegida>
                <FormularioAlta />
              </RutaProtegida>
            } />
            <Route path="/clientes/:id" element={
              <RutaProtegida>
                <DetalleCliente />
              </RutaProtegida>
            } />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Box>

        <Footer />
      </Box>
    </BrowserRouter>
  )
}

export default App