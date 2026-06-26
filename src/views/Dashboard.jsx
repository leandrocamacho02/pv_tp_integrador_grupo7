import { useEffect, useState } from 'react'
import { useAdmin } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import {
  Container, Grid, Card, CardContent,
  Typography, Box, Button, CircularProgress
} from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import BusinessIcon from '@mui/icons-material/Business'
import SupportIcon from '@mui/icons-material/Support'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const Dashboard = () => {
  const { admin } = useAdmin()
  const navigate = useNavigate()

  const [clientes, setClientes] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const respuesta = await fetch('https://fakestoreapi.com/users')
        if (!respuesta.ok) throw new Error('Error al obtener clientes')
        const datos = await respuesta.json()
        setClientes(datos)
      } catch (err) {
        console.error(err)
      } finally {
        setCargando(false)
      }
    }
    obtenerClientes()
  }, [])

  const ciudadesUnicas = new Set(clientes.map((c) => c.address.city)).size

  const metricas = [
    {
      titulo: 'Total de Clientes',
      valor: cargando ? '—' : clientes.length,
      descripcion: 'Clientes registrados en el sistema',
      icono: <PeopleIcon sx={{ fontSize: 32 }} />,
      color: '#4f46e5'
    },
    {
      titulo: 'Ciudades',
      valor: cargando ? '—' : ciudadesUnicas,
      descripcion: 'Ciudades distintas con clientes',
      icono: <LocationCityIcon sx={{ fontSize: 32 }} />,
      color: '#06b6d4'
    },
    {
      titulo: 'Tu Sector',
      valor: admin?.sector || '-',
      descripcion: 'Sector actual en el sistema',
      icono: <BusinessIcon sx={{ fontSize: 32 }} />,
      color: '#f97316'
    },
    {
      titulo: 'Disponibilidad',
      valor: '24/7',
      descripcion: 'Conexión con FakeStoreAPI',
      icono: <SupportIcon sx={{ fontSize: 32 }} />,
      color: '#22c55e'
    }
  ]

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Box sx={{
        mb: 4,
        p: 4,
        borderRadius: 4,
        background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
        color: '#fff'
      }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Hola, {admin?.nombre} 👋
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          Panel de Control de Clientes — Sector {admin?.sector}
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {metricas.map((metrica, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{
                  width: 52,
                  height: 52,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: `${metrica.color}1A`,
                  color: metrica.color,
                  mb: 2
                }}>
                  {metrica.icono}
                </Box>
                {cargando ? (
                  <CircularProgress size={24} />
                ) : (
                  <Typography variant="h4" fontWeight="bold">
                    {metrica.valor}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {metrica.titulo}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {metrica.descripcion}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Accesos rápidos
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{
                  width: 48, height: 48, borderRadius: 2,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backgroundColor: 'rgba(79, 70, 229, 0.1)', color: '#4f46e5'
                }}>
                  <PeopleIcon />
                </Box>
                <Box>
                  <Typography fontWeight="bold">Ver Clientes</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Buscá y gestioná tu cartera
                  </Typography>
                </Box>
              </Box>
              <Button
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/clientes')}
              >
                Ir
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{
                  width: 48, height: 48, borderRadius: 2,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backgroundColor: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4'
                }}>
                  <PersonAddIcon />
                </Box>
                <Box>
                  <Typography fontWeight="bold">Agregar Cliente</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Dar de alta un nuevo cliente
                  </Typography>
                </Box>
              </Box>
              <Button
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/clientes')}
              >
                Ir
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard