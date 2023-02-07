import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Slide } from '@mui/material';

const style = {
  position: 'absolute',
  top: '5%',
  left: '5%',
  right: '5%',
  bottom: '5%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  // border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TileModal({open, handleClose, children}) {

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
      >
        <Slide in={open} timeout={500} direction="right">
          <Box sx={style}>
            {children}
          </Box>
        </Slide>
      </Modal>
    </div>
  );
}