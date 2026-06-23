import { useAdmin } from '../../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Box, Chip } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import DashboardIcon from '@mui/icons-material/Dashboard'

const Header = () => {
  const { admin, cerrarSesion } = useAdmin()
  const navigate = useNavigate()

  const handleCerrarSesion = () => {
    cerrarSesion()
    navigate('/login')
  }

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DashboardIcon />
          <Typography variant="h6" fontWeight="bold">
            Panel de Control de Clientes
          </Typography>
        </Box>

        {admin && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">
              {admin.nombre}
            </Typography>
            <Chip
              label={admin.sector}
              color={admin.sector === 'Gerencia' ? 'warning' : 'default'}
              size="small"
              sx={{ color: 'white', fontWeight: 'bold' }}
            />
            <Button
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={handleCerrarSesion}
              size="small"
            >
              Cerrar Sesión
            </Button>
          </Box>
        )}

      </Toolbar>
    </AppBar>
  )
}

export default Header