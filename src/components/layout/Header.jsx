import { useAdmin } from '../../context/AdminContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Box, Chip } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import GridViewIcon from '@mui/icons-material/GridView'

const Header = () => {
  const { admin, cerrarSesion } = useAdmin()
  const navigate = useNavigate()
  const location = useLocation()

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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

            <Button
              color="inherit"
              startIcon={<GridViewIcon />}
              onClick={() => navigate('/dashboard')}
              sx={{
                fontWeight: location.pathname === '/dashboard' ? 'bold' : 'normal',
                borderBottom: location.pathname === '/dashboard' ? '2px solid white' : 'none'
              }}
            >
              Dashboard
            </Button>

            <Button
              color="inherit"
              startIcon={<PeopleIcon />}
              onClick={() => navigate('/clientes')}
              sx={{
                fontWeight: location.pathname === '/clientes' ? 'bold' : 'normal',
                borderBottom: location.pathname === '/clientes' ? '2px solid white' : 'none'
              }}
            >
              Clientes
            </Button>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
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

          </Box>
        )}

      </Toolbar>
    </AppBar>
  )
}

export default Header