import React from 'react'
import { Dialog, DialogContent, Box, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import FormularioAlta from './FormularioAlta'

const ModalAltaCliente = ({ open, handleClose, onClienteCreado }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 1, pr: 1 }}>
        <IconButton onClick={handleClose} color="error">
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent sx={{ pt: 0 }}>
        <FormularioAlta 
          onClienteCreado={onClienteCreado} 
          handleCloseModal={handleClose} 
        />
      </DialogContent>
    </Dialog>
  )
}

export default ModalAltaCliente