import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAdmin } from '../context/AdminContext'
import {
  Container, Paper, Typography, Box,
  CircularProgress, Alert, Button,
  Divider, Chip, Snackbar
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import PersonIcon from '@mui/icons-material/Person'

const DetalleCliente = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { admin } = useAdmin()

  const [cliente, setCliente] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [snackbar, setSnackbar] = useState({
    abierto: false,
    mensaje: '',
    tipo: 'success'
  })

  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        const respuesta = await fetch(`https://fakestoreapi.com/users/${id}`)
        if (!respuesta.ok) throw new Error('No se encontró el cliente')
        const datos = await respuesta.json()
        setCliente(datos)
      } catch (err) {
        setError(err.message)
      } finally {
        setCargando(false)
      }
    }
    obtenerCliente()
  }, [id])

  const handleEliminar = async () => {
    try {
      const respuesta = await fetch(`https://fakestoreapi.com/users/${id}`, {
        method: 'DELETE'
      })
      if (!respuesta.ok) throw new Error('Error al eliminar el cliente')
      setSnackbar({
        abierto: true,
        mensaje: `Cliente ${id} eliminado correctamente.`,
        tipo: 'success'
      })
      setTimeout(() => navigate('/clientes'), 2000)
    } catch (err) {
      setSnackbar({
        abierto: true,
        mensaje: err.message,
        tipo: 'error'
      })
    }
  }

  if (cargando) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>

      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/clientes')}
        sx={{ mb: 2 }}
      >
        Volver al listado
      </Button>

      <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>

        <Box sx={{
          background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
          p: 3,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <PersonIcon sx={{ fontSize: 50 }} />
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {cliente.name.firstname} {cliente.name.lastname}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>
              ID: {cliente.id}
            </Typography>
          </Box>
          {admin.sector === 'Gerencia' && (
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleEliminar}
              sx={{ ml: 'auto' }}
            >
              Eliminar Cliente
            </Button>
          )}
        </Box>

        <Box sx={{ p: 3 }}>

          <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
            Información de Contacto
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
            <Typography><strong>Email:</strong> {cliente.email}</Typography>
            <Typography><strong>Teléfono:</strong> {cliente.phone}</Typography>
          </Box>

          <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
            Dirección
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
            <Typography><strong>Calle:</strong> {cliente.address.street} {cliente.address.number}</Typography>
            <Typography><strong>Ciudad:</strong> {cliente.address.city}</Typography>
            <Typography><strong>Código Postal:</strong> {cliente.address.zipcode}</Typography>
          </Box>

          <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
            Credenciales
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
            <Typography><strong>Username:</strong> {cliente.username}</Typography>
            <Typography><strong>Password:</strong> {cliente.password}</Typography>
          </Box>

          <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
            Permisos del Administrador
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Chip
            label={admin.sector === 'Gerencia' ? 'Gerencia — Puede eliminar clientes' : 'Soporte — Solo visualización'}
            color={admin.sector === 'Gerencia' ? 'warning' : 'default'}
            sx={{ fontWeight: 'bold' }}
          />

        </Box>

      </Paper>

      <Snackbar
        open={snackbar.abierto}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, abierto: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.tipo}>
          {snackbar.mensaje}
        </Alert>
      </Snackbar>

    </Container>
  )
}

export default DetalleCliente