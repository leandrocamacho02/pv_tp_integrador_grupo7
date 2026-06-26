import { useState, useEffect } from 'react'
import { Container, Grid, CircularProgress, Alert, Box } from '@mui/material'
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
        setClientes(datos)
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
    <Container sx={{ mt: 4 }}>
      <FormularioAlta />
      <Buscador valor={busqueda} onChange={setBusqueda} />

      {cargando && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!cargando && error && (
        <Alert severity="error">{error}</Alert>
      )}

      {!cargando && !error && (
        <Grid container spacing={2}>
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