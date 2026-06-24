import { TextField } from '@mui/material'

const Buscador = ({ valor, onChange }) => {
  return (
    <TextField
      fullWidth
      label="Buscar por apellido o ciudad"
      value={valor}
      onChange={(e) => onChange(e.target.value)}
      sx={{ mb: 3 }}
    />
  )
}

export default Buscador