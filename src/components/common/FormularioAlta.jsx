import { useState } from 'react'
import {
  Box, Typography, TextField, Button,
  Paper, Grid, Snackbar, Alert, Container
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const FormularioAlta = () => {
  const navigate = useNavigate()
  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    ciudad: 'Seleccione su ciudad',
    ciudadOtra: '',
    username: '',
    password: ''
  })

  const [snackbar, setSnackbar] = useState({
    abierto: false,
    mensaje: '',
    tipo: 'success'
  })

  const [cargando, setCargando] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormulario({ ...formulario, [name]: value })
  }

  const handleEnviar = async () => {
    const ciudadFinal = formulario.ciudad === 'Otra' ? formulario.ciudadOtra : formulario.ciudad

    if (!formulario.nombre.trim() || !formulario.apellido.trim() || !formulario.email.trim() || !formulario.telefono.trim() || ciudadFinal === 'Seleccione su ciudad' || !ciudadFinal.trim()) {
      setSnackbar({
        abierto: true,
        mensaje: 'Faltan completar campos obligatorios o seleccionar una ciudad válida.',
        tipo: 'error'
      })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formulario.email)) {
      setSnackbar({
        abierto: true,
        mensaje: 'El correo electrónico no es válido.',
        tipo: 'error'
      })
      return
    }

    const telefonoRegex = /^[0-9]{8,15}$/
    if (!telefonoRegex.test(formulario.telefono)) {
      setSnackbar({
        abierto: true,
        mensaje: 'El teléfono debe tener entre 8 y 15 números, sin letras.',
        tipo: 'error'
      })
      return
    }

    try {
      setCargando(true)
      const respuesta = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formulario.email,
          username: formulario.username,
          password: formulario.password,
          name: {
            firstname: formulario.nombre,
            lastname: formulario.apellido
          },
          address: {
            city: ciudadFinal,
            street: '',
            number: 0,
            zipcode: ''
          },
          phone: formulario.telefono
        })
      })

      if (!respuesta.ok) throw new Error('Error al crear el cliente')

      const datos = await respuesta.json()

      const clienteNuevo = {
        id: Date.now(),
        email: formulario.email,
        username: formulario.username,
        password: formulario.password,
        name: {
          firstname: formulario.nombre,
          lastname: formulario.apellido
        },
        address: {
          city: ciudadFinal,
          street: '',
          number: 0,
          zipcode: ''
        },
        phone: formulario.telefono
      }

      const clientesGuardados = JSON.parse(localStorage.getItem('clientesNuevos')) || []
      localStorage.setItem('clientesNuevos', JSON.stringify([...clientesGuardados, clienteNuevo]))

      setSnackbar({
        abierto: true,
        mensaje: `Cliente creado exitosamente con ID: ${datos.id}`,
        tipo: 'success'
      })

      setFormulario({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        ciudad: 'Seleccione su ciudad',
        ciudadOtra: '',
        username: '',
        password: ''
      })

      setTimeout(() => navigate('/clientes'), 2000)

    } catch (err) {
      let mensajeError = err.message
      if (err.message === 'Failed to fetch' || err.message === 'Network error' || !navigator.onLine) {
        mensajeError = 'Problemas en la red. Compruebe su conexión a internet.'
      }
      
      setSnackbar({
        abierto: true,
        mensaje: mensajeError,
        tipo: 'error'
      })
    } finally {
      setCargando(false)
    }
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

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <PersonAddIcon color="primary" />
          <Typography variant="h6" fontWeight="bold">
            Alta de Nuevo Cliente
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Nombre" name="nombre" value={formulario.nombre} onChange={handleChange} fullWidth size="small" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Apellido" name="apellido" value={formulario.apellido} onChange={handleChange} fullWidth size="small" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Email" name="email" value={formulario.email} onChange={handleChange} fullWidth size="small" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Teléfono" name="telefono" value={formulario.telefono} onChange={handleChange} fullWidth size="small" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Ciudad" name="ciudad" value={formulario.ciudad} onChange={handleChange} fullWidth size="small" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Username" name="username" value={formulario.username} onChange={handleChange} fullWidth size="small" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Password" name="password" type="password" value={formulario.password} onChange={handleChange} fullWidth size="small" />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleEnviar}
              disabled={cargando}
            >
              {cargando ? 'Enviando...' : 'Agregar Cliente'}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Snackbar
        open={snackbar.abierto}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, abierto: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.tipo} onClose={() => setSnackbar({ ...snackbar, abierto: false })}>
          {snackbar.mensaje}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default FormularioAlta