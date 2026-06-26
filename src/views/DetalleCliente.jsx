import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAdmin } from '../context/AdminContext'
import {
  CircularProgress, Alert, Card, CardContent,
  Typography, Button, Box, Container, Avatar,
  Divider, Chip, Snackbar, Dialog, DialogTitle,
  DialogContent, DialogActions
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined'

const DetalleCliente = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { admin } = useAdmin()

  const [cliente, setCliente] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [snackbar, setSnackbar] = useState({ abierto: false, mensaje: '', tipo: 'error' })
  const [dialogoAbierto, setDialogoAbierto] = useState(false)

  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        // Primero buscar en localStorage
        const clientesLocales = JSON.parse(localStorage.getItem('clientesNuevos') || '[]')
        const clienteLocal = clientesLocales.find((c) => c.id === Number(id))

        if (clienteLocal) {
          // Es un cliente local, no necesita fetch
          setCliente(clienteLocal)
          setCargando(false)
          return
        }

        // Si no está en local, buscarlo en la API normalmente
        const respuesta = await fetch(`https://fakestoreapi.com/users/${id}`)
        if (!respuesta.ok) throw new Error('No se pudo cargar el cliente')
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
      const clientesLocales = JSON.parse(localStorage.getItem('clientesNuevos') || '[]')
      const esLocal = clientesLocales.some((c) => c.id === Number(id))

      if (esLocal) {
        // Eliminar directamente del array local
        const actualizados = clientesLocales.filter((c) => c.id !== Number(id))
        localStorage.setItem('clientesNuevos', JSON.stringify(actualizados))
      } else {
        // Cliente de la API: hacer DELETE y marcar como eliminado
        const respuesta = await fetch(`https://fakestoreapi.com/users/${id}`, {
          method: 'DELETE'
        })
        if (!respuesta.ok) throw new Error('Error al eliminar el cliente')

        const eliminados = JSON.parse(localStorage.getItem('clientesEliminados') || '[]')
        localStorage.setItem('clientesEliminados', JSON.stringify([...eliminados, Number(id)]))
      }

      setSnackbar({
        abierto: true,
        mensaje: `Cliente eliminado correctamente.`,
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
        <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>
      </Container>
    )
  }

  if (!cliente) return null

  const iniciales = `${cliente.name.firstname[0]}${cliente.name.lastname[0]}`.toUpperCase()

  return (
    <Container sx={{ mt: 4, mb: 6, display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ maxWidth: 560, width: '100%', p: 1 }}>
        <Box sx={{
          background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
          borderRadius: '14px 14px 0 0',
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: '#fff'
        }}>
          <Avatar sx={{
            width: 72,
            height: 72,
            bgcolor: 'rgba(255,255,255,0.2)',
            fontSize: 26,
            fontWeight: 'bold',
            mb: 1.5
          }}>
            {iniciales}
          </Avatar>
          <Typography variant="h5" fontWeight="bold">
            {cliente.name.firstname} {cliente.name.lastname}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            ID #{cliente.id}
          </Typography>
        </Box>

        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <EmailOutlinedIcon sx={{ color: 'primary.main' }} />
              <Typography>{cliente.email}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <PhoneOutlinedIcon sx={{ color: 'primary.main' }} />
              <Typography>{cliente.phone}</Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <HomeOutlinedIcon sx={{ color: 'primary.main' }} />
            <Typography variant="subtitle1" fontWeight="bold">Dirección</Typography>
          </Box>
          <Box sx={{ pl: 4, mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              {cliente.address.street} {cliente.address.number}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {cliente.address.city} — CP {cliente.address.zipcode}
            </Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <VpnKeyOutlinedIcon sx={{ color: 'primary.main' }} />
            <Typography variant="subtitle1" fontWeight="bold">Credenciales</Typography>
          </Box>
          <Box sx={{ pl: 4, mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Usuario: <strong>{cliente.username}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Contraseña: <strong>{cliente.password}</strong>
            </Typography>
          </Box>

          {admin?.sector === 'Gerencia' && (
            <Box mt={3}>
              <Chip
                label="Acceso Gerencia"
                size="small"
                sx={{ mb: 1.5, backgroundColor: '#fff7ed', color: '#f97316', fontWeight: 'bold' }}
              />
              <Button
                variant="contained"
                color="error"
                fullWidth
                startIcon={<DeleteIcon />}
                onClick={() => setDialogoAbierto(true)}
              >
                Eliminar Cliente de la Base de Datos
              </Button>
            </Box>
          )}

          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/clientes')}
            sx={{ mt: 2 }}
          >
            Volver
          </Button>
        </CardContent>
      </Card>

      <Dialog open={dialogoAbierto} onClose={() => setDialogoAbierto(false)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Seguro que querés eliminar a <strong>{cliente.name.firstname} {cliente.name.lastname}</strong>? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogoAbierto(false)}>Cancelar</Button>
          <Button color="error" variant="contained" onClick={handleEliminar}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.abierto}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, abierto: false })}
      >
        <Alert severity={snackbar.tipo} onClose={() => setSnackbar({ ...snackbar, abierto: false })}>
          {snackbar.mensaje}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default DetalleCliente