import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAdmin } from './context/AdminContext'
import Header from './components/layout/Header'
import Login from './views/Login'
import Dashboard from './views/Dashboard'
import ListaClientes from './views/ListaClientes'

const RutaProtegida = ({ children }) => {
  const { admin } = useAdmin()
  return admin ? children : <Navigate to="/login" />
}

const App = () => {
  return (
    <BrowserRouter>
      <Header />
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
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App