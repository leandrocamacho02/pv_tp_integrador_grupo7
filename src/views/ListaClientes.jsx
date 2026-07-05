import { useState, useEffect } from 'react'
import { Container, Grid, CircularProgress, Alert, Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import Buscador from '../components/common/Buscador'
import ClienteCard from '../components/common/ClienteCard'

const ListaClientes = () => {
  const [clientes, setClientes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const respuesta = await fetch('https://fakestoreapi.com/users')
        if (!respuesta.ok) throw new Error('No se pudo conectar con el servidor')
        const datos = await respuesta.json()
        const clientesGuardados = JSON.parse(localStorage.getItem('clientesNuevos')) || []
        const eliminados = JSON.parse(localStorage.getItem('clientesEliminados')) || []
        const todos = [...datos, ...clientesGuardados]
        const filtrados = todos.filter((c) => !eliminados.includes(c.id))
        setClientes(filtrados)
      } catch (err) {
        setError(err.message)
      } finally {
        setCargando(false)
      }
    }
    obtenerClientes()
  }, [])

  const clientesFiltrados = clientes.filter((cliente) => {
    const texto = busqueda.toLowerCase()
    return (
      cliente.name.lastname.toLowerCase().includes(texto) ||
      cliente.address.city.toLowerCase().includes(texto)
    )
  })

  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          Gestión de Clientes
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/clientes/nuevo')}
        >
          Nuevo Cliente
        </Button>
      </Box>

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
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={cliente.id}>
              <ClienteCard cliente={cliente} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}

export default ListaClientes