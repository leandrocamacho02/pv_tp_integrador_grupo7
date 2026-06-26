import { useNavigate, useLocation } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'

const Nav = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const links = [
    { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { label: 'Clientes', path: '/clientes', icon: <PeopleIcon /> }
  ]

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
      {links.map((link) => {
        const activo = location.pathname.startsWith(link.path)
        return (
          <Button
            key={link.path}
            color="inherit"
            startIcon={link.icon}
            onClick={() => navigate(link.path)}
            size="small"
            sx={{
              whiteSpace: 'nowrap',
              px: 1.5,
              backgroundColor: activo ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.25)' }
            }}
          >
            {link.label}
          </Button>
        )
      })}
    </Box>
  )
}

export default Nav