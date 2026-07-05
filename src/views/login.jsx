import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdmin } from '../context/AdminContext'
import {
  Box, Paper, Typography, TextField,
  Button, MenuItem, Select, FormControl,
  InputLabel, Alert
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

const Login = () => {
  const { iniciarSesion } = useAdmin()
  const navigate = useNavigate()

  const [formulario, setFormulario] = useState({
    nombre: '',
    sector: ''
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormulario({ ...formulario, [name]: value })
  }

  const handleIngresar = () => {
    if (formulario.nombre.trim() === '') {
      setError('El nombre es obligatorio.')
      return
    }
    if (formulario.sector === '') {
      setError('Seleccioná un sector.')
      return
    }
    setError('')
    iniciarSesion(formulario)
    navigate('/dashboard')
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
      p: 2
    }}>
      <Paper
        elevation={0}
        sx={{
          p: 5,
          width: '100%',
          maxWidth: 420,
          borderRadius: 4,
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Box sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #4f46e5 0%, #818cf8 100%)',
            mb: 2
          }}>
            <LockOutlinedIcon sx={{ fontSize: 30, color: '#fff' }} />
          </Box>
          <Typography variant="h5" fontWeight="bold">
            Panel de Control
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Ingresá tus datos para continuar
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Nombre de Usuario"
            name="nombre"
            value={formulario.nombre}
            onChange={handleChange}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Sector</InputLabel>
            <Select
              name="sector"
              value={formulario.sector}
              onChange={handleChange}
              label="Sector"
            >
              <MenuItem value="Soporte">Soporte</MenuItem>
              <MenuItem value="Gerencia">Gerencia</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={handleIngresar}
            sx={{
              mt: 1,
              py: 1.2,
              background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #4338ca 0%, #3730a3 100%)',
              }
            }}
          >
            Ingresar
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default Login