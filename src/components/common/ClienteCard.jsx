import { Card, CardContent, Typography, Button, Box, Avatar } from '@mui/material'
import { Link } from 'react-router-dom'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const ClienteCard = ({ cliente }) => {
  const iniciales = `${cliente.name.firstname[0]}${cliente.name.lastname[0]}`.toUpperCase()

  return (
    <Card sx={{ height: 240, display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Avatar sx={{
            bgcolor: 'primary.main',
            width: 44,
            height: 44,
            fontSize: 16,
            fontWeight: 'bold'
          }}>
            {iniciales}
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
              {cliente.name.firstname} {cliente.name.lastname}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmailOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary" noWrap>
              {cliente.email}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PhoneOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {cliente.phone}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOnOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {cliente.address.city}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          component={Link}
          to={`/clientes/${cliente.id}`}
          variant="contained"
          fullWidth
          size="small"
          endIcon={<ArrowForwardIcon />}
          sx={{
            background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #4338ca 0%, #3730a3 100%)',
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