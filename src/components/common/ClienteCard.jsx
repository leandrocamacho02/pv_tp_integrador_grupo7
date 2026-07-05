import { Card, CardContent, Typography, Button, Box, Avatar, Chip } from '@mui/material'
import { Link } from 'react-router-dom'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import BadgeIcon from '@mui/icons-material/Badge'

const ClienteCard = ({ cliente }) => {
  const iniciales = `${cliente.name.firstname[0]}${cliente.name.lastname[0]}`.toUpperCase()

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 3,
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
          <Avatar 
            sx={{
              bgcolor: 'primary.main',
              width: 48,
              height: 48,
              fontSize: 18,
              fontWeight: 'bold',
              boxShadow: 2
            }}
          >
            {iniciales}
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ lineHeight: 1.2, fontWeight: 600 }}>
              {cliente.name.firstname} {cliente.name.lastname}
            </Typography>
            <Chip
              icon={<BadgeIcon sx={{ fontSize: '14px !important' }} />}
              label={`ID: ${cliente.id}`}
              size="small"
              color="secondary"
              variant="outlined"
              sx={{ mt: 0.5, height: 20, fontSize: '0.7rem', fontWeight: 'bold' }}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <EmailOutlinedIcon sx={{ fontSize: 20, color: 'primary.main' }} />
            <Typography variant="body2" color="text.secondary" noWrap>
              {cliente.email}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <PhoneOutlinedIcon sx={{ fontSize: 20, color: 'primary.main' }} />
            <Typography variant="body2" color="text.secondary">
              {cliente.phone}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <LocationOnOutlinedIcon sx={{ fontSize: 20, color: 'primary.main' }} />
            <Typography variant="body2" color="text.secondary">
              {cliente.address.city}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <Box sx={{ p: 2, pt: 0, px: 3, pb: 3 }}>
        <Button
          component={Link}
          to={`/clientes/${cliente.id}`}
          variant="contained"
          fullWidth
          size="medium"
          endIcon={<ArrowForwardIcon />}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
            boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #4338ca 0%, #3730a3 100%)',
              boxShadow: '0 6px 8px -1px rgba(79, 70, 229, 0.4)',
            }
          }}
        >
          Ver Ficha Completa
        </Button>
      </Box>
    </Card>
  )
}

export default ClienteCard