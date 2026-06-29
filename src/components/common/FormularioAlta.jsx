import { useState } from 'react'
import {
  Box, Typography, TextField, Button,
  Grid, Snackbar, Alert, MenuItem
} from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const ciudadesOpciones = [
  'Seleccione su ciudad',
  'San Salvador de Jujuy',
  'Perico',
  'Palpalá',
  'San Pedro',
  'Libertador General San Martín',
  'El Carmen',
  'Otra'
]

const FormularioAlta = ({ onClienteCreado, handleCloseModal }) => {
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
        id: datos.id,
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
      const clientesActualizados = [...clientesGuardados, clienteNuevo]
      localStorage.setItem('clientesNuevos', JSON.stringify(clientesActualizados))

      if (onClienteCreado) {
        onClienteCreado(clienteNuevo)
      }

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

      setTimeout(() => {
        if (handleCloseModal) handleCloseModal()
      }, 1500)

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
    <Box sx={{ p: 1, mb: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <PersonAddIcon color="primary" />
        <Typography variant="h6" fontWeight="bold">
          Alta de Nuevo Cliente
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="Nombre" name="nombre" value={formulario.nombre} onChange={handleChange} fullWidth size="small" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="Apellido" name="apellido" value={formulario.apellido} onChange={handleChange} fullWidth size="small" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="Email" name="email" value={formulario.email} onChange={handleChange} fullWidth size="small" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="Teléfono" name="telefono" value={formulario.telefono} onChange={handleChange} fullWidth size="small" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField select label="Ciudad" name="ciudad" value={formulario.ciudad} onChange={handleChange} fullWidth size="small">
            {ciudadesOpciones.map((opcion) => (
              <MenuItem key={opcion} value={opcion} disabled={opcion === 'Seleccione su ciudad'}>
                {opcion}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {formulario.ciudad === 'Otra' && (
          <Grid item xs={12} sm={6} md={4}>
            <TextField label="Indique su ciudad" name="ciudadOtra" value={formulario.ciudadOtra} onChange={handleChange} fullWidth size="small" />
          </Grid>
        )}
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="Nombre de usuario" name="username" value={formulario.username} onChange={handleChange} fullWidth size="small" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField label="Contraseña" name="password" type="password" value={formulario.password} onChange={handleChange} fullWidth size="small" />
        </Grid>
        <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
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
    </Box>
  )
}

export default FormularioAlta