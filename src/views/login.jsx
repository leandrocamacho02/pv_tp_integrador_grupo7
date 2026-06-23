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
      backgroundColor: '#f5f6fa'
    }}>
      <Paper elevation={4} sx={{ p: 5, width: '100%', maxWidth: 400, borderRadius: 3 }}>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <LockOutlinedIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
          <Typography variant="h5" fontWeight="bold">
            Panel de Control
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ingresá tus datos para continuar
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Nombre del Administrador"
            name="nombre"
            value={formulario.nombre}
            onChange={handleChange}
            fullWidth
            size="small"
          />

          <FormControl fullWidth size="small">
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
            onClick={handleIngresar}
            sx={{ mt: 1 }}
          >
            Ingresar
          </Button>
        </Box>

      </Paper>
    </Box>
  )
}

export default Login