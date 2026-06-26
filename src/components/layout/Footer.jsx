import { Box, Typography, Container } from '@mui/material'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 2.5,
        textAlign: 'center',
        borderTop: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper'
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary">
          Panel de Control de Clientes — Programación Visual {new Date().getFullYear()}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Datos provistos por FakeStoreAPI
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer