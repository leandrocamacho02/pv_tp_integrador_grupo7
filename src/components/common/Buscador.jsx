import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const Buscador = ({ valor, onChange }) => {
  return (
    <TextField
      fullWidth
      placeholder="Buscar por apellido o ciudad..."
      value={valor}
      onChange={(e) => onChange(e.target.value)}
      sx={{
        mb: 3,
        backgroundColor: '#fff',
        borderRadius: 2,
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
        }
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: 'text.secondary' }} />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default Buscador