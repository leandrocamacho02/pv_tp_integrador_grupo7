import { useState } from 'react'
import {
  Box, Typography, TextField, Button,
  Paper, Grid, Snackbar, Alert
} from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const FormularioAlta = ({ onClienteCreado }) => {
  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    ciudad: '',
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
  if (!formulario.nombre || !formulario.apellido || !formulario.email) {
    setSnackbar({
      abierto: true,
      mensaje: 'Nombre, apellido y email son obligatorios.',
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
          city: formulario.ciudad,
          street: '',
          number: 0,
          zipcode: ''
        },
        phone: formulario.telefono
      })
    })

    if (!respuesta.ok) throw new Error('Error al crear el cliente')

    const datos = await respuesta.json()

    const nuevoCliente = {
      id: Date.now(),
      email: formulario.email,
      username: formulario.username,
      password: formulario.password,
      name: {
        firstname: formulario.nombre,
        lastname: formulario.apellido
      },
      address: {
        city: formulario.ciudad,
        street: '',
        number: 0,
        zipcode: ''
      },
      phone: formulario.telefono
    }

    const clientesGuardados = JSON.parse(localStorage.getItem('clientesNuevos') || '[]')
    localStorage.setItem('clientesNuevos', JSON.stringify([...clientesGuardados, nuevoCliente]))

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
      ciudad: '',
      username: '',
      password: ''
    })

  } catch (err) {
    setSnackbar({
      abierto: true,
      mensaje: err.message,
      tipo: 'error'
    })
  } finally {
    setCargando(false)
  }
}

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
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
    </Paper>
  )
}

export default FormularioAlta