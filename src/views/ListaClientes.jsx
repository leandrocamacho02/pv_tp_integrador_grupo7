import { useState, useEffect } from 'react'
import { Container, Grid, CircularProgress, Alert, Box, Typography } from '@mui/material'
import Buscador from '../components/common/Buscador'
import ClienteCard from '../components/common/ClienteCard'
import FormularioAlta from '../components/common/FormularioAlta'

const ListaClientes = () => {
  const [clientes, setClientes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const respuesta = await fetch('https://fakestoreapi.com/users')
        if (!respuesta.ok) throw new Error('No se pudo conectar con el servidor')
        const datos = await respuesta.json()

        const clientesGuardados = JSON.parse(localStorage.getItem('clientesNuevos')) || []

        setClientes([...datos, ...clientesGuardados])
      } catch (err) {
        setError(err.message)
      } finally {
        setCargando(false)
      }
    }
    obtenerClientes()
  }, [])

  const handleClienteCreado = (clienteNuevo) => {
    setClientes((prev) => [...prev, clienteNuevo])
  }

  const clientesFiltrados = clientes.filter((cliente) => {
    const texto = busqueda.toLowerCase()
    return (
      cliente.name.lastname.toLowerCase().includes(texto) ||
      cliente.address.city.toLowerCase().includes(texto)
    )
  })

  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Gestión de Clientes
      </Typography>

      <FormularioAlta onClienteCreado={handleClienteCreado} />
      <Buscador valor={busqueda} onChange={setBusqueda} />

      {cargando && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {!cargando && error && (
        <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>
      )}

      {!cargando && !error && clientesFiltrados.length === 0 && (
        <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
          No se encontraron clientes con ese criterio de búsqueda.
        </Typography>
      )}

      {!cargando && !error && clientesFiltrados.length > 0 && (
        <Grid container spacing={2.5}>
          {clientesFiltrados.map((cliente) => (
            <Grid item xs={12} sm={6} md={4} key={cliente.id}>
              <ClienteCard cliente={cliente} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}

export default ListaClientes