import { Card, CardContent, Typography, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'

const ClienteCard = ({ cliente }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2" color="text.secondary">
          ID: {cliente.id}
        </Typography>
        <Typography variant="h6">
          {cliente.name.firstname} {cliente.name.lastname}
        </Typography>
        <Typography variant="body2">{cliente.email}</Typography>
        <Typography variant="body2">{cliente.phone}</Typography>
        <Typography variant="body2">{cliente.address.city}</Typography>
      </CardContent>
      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          component={Link}
          to={`/clientes/${cliente.id}`}
          variant="outlined"
          fullWidth
          size="small"
        >
          Ver Ficha Completa
        </Button>
      </Box>
    </Card>
  )
}

export default ClienteCard