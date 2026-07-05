import { Box, Typography, Container, Grid, Button } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import SchoolIcon from '@mui/icons-material/School'
import CodeIcon from '@mui/icons-material/Code'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        pt: 4,
        pb: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between" sx={{ mb: 3 }}>
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, gap: 1, mb: 1 }}>
              <SchoolIcon color="primary" />
              <Typography variant="subtitle1" fontWeight="bold">
                Universidad Nacional de Jujuy
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Facultad de Ingeniería
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Materia: Programación Visual
            </Typography>
          </Grid>

          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
              <CodeIcon color="primary" />
              <Typography variant="subtitle1" fontWeight="bold">
                Panel de Control de Clientes
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Trabajo Práctico Integrador
            </Typography>
          </Grid>

          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-end' } }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
              Repositorio Oficial
            </Typography>
            <Button
              variant="outlined"
              size="small"
              startIcon={<GitHubIcon />}
              href="https://github.com/leandrocamacho02/pv_tp_integrador_grupo7"
              target="_blank"
              sx={{ textTransform: 'none', borderRadius: 2, color: 'text.secondary', borderColor: 'divider' }}
            >
              Ver código fuente
            </Button>
          </Grid>
        </Grid>

        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Desarrollado por el Grupo 7 — Datos provistos por FakeStoreAPI
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer