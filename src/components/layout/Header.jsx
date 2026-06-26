import { useAdmin } from '../../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Box, Chip } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'

const Header = () => {
  const { admin, cerrarSesion } = useAdmin()
  const navigate = useNavigate()

  const handleCerrarSesion = () => {
    cerrarSesion()
    navigate('/login')
  }

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 1,
          py: 1
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, whiteSpace: 'nowrap' }}>
          <DashboardIcon />
          <Typography variant="h6" fontWeight="bold" sx={{ whiteSpace: 'nowrap' }}>
            Panel de Control de Clientes
          </Typography>
        </Box>

        {admin && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Button
              color="inherit"
              startIcon={<DashboardIcon />}
              onClick={() => navigate('/dashboard')}
              size="small"
              sx={{
                whiteSpace: 'nowrap',
                px: 1.5,
                backgroundColor: 'rgba(255,255,255,0.1)',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
              }}
            >
              Dashboard
            </Button>

            <Button
              color="inherit"
              startIcon={<PeopleIcon />}
              onClick={() => navigate('/clientes')}
              size="small"
              sx={{
                whiteSpace: 'nowrap',
                px: 1.5,
                backgroundColor: 'rgba(255,255,255,0.1)',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
              }}
            >
              Clientes
            </Button>

            <Box sx={{ width: '1px', height: 24, backgroundColor: 'rgba(255,255,255,0.3)', mx: 0.5 }} />

            <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
              {admin.nombre}
            </Typography>

            <Chip
              label={admin.sector}
              size="small"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                backgroundColor: admin.sector === 'Gerencia' ? '#f97316' : 'rgba(255,255,255,0.2)'
              }}
            />

            <Button
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={handleCerrarSesion}
              size="small"
              sx={{ whiteSpace: 'nowrap', px: 1.5 }}
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