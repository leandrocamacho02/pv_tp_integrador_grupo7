import { useAdmin } from '../context/AdminContext'
import {
  Container, Grid, Card, CardContent,
  Typography, Box
} from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import SupportIcon from '@mui/icons-material/Support'
import BusinessIcon from '@mui/icons-material/Business'

const Dashboard = () => {
  const { admin } = useAdmin()

  const metricas = [
    {
      titulo: 'Total de Clientes',
      valor: '10',
      descripcion: 'Clientes registrados en el sistema',
      icono: <PeopleIcon sx={{ fontSize: 40, color: '#1976d2' }} />
    },
    {
      titulo: 'Clientes Activos',
      valor: '8',
      descripcion: 'Clientes con actividad reciente',
      icono: <CheckCircleIcon sx={{ fontSize: 40, color: '#27ae60' }} />
    },
    {
      titulo: 'Sector',
      valor: admin?.sector || '-',
      descripcion: 'Tu sector actual en el sistema',
      icono: <BusinessIcon sx={{ fontSize: 40, color: '#f39c12' }} />
    },
    {
      titulo: 'Soporte Activo',
      valor: '24/7',
      descripcion: 'Disponibilidad del sistema',
      icono: <SupportIcon sx={{ fontSize: 40, color: '#e74c3c' }} />
    }
  ]

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Bienvenido, {admin?.nombre}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Panel de Control de Clientes — {admin?.sector}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {metricas.map((metrica, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card elevation={3} sx={{ borderRadius: 2, height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold" color="text.secondary">
                    {metrica.titulo}
                  </Typography>
                  {metrica.icono}
                </Box>
                <Typography variant="h3" fontWeight="bold" color="primary">
                  {metrica.valor}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {metrica.descripcion}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Dashboard