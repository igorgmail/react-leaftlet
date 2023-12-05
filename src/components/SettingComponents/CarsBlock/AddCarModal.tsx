import React, { useState, useEffect, FC } from "react"

import { Fab, Box, Typography, Modal, Fade } from "@mui/material"

// Icons
import AddIcon from '@mui/icons-material/Add';

import Backdrop from '@mui/material/Backdrop';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type TAddCarModalProps = {
  // open: boolean,
  // // setOpen: (a: boolean) => void,
  // handleClose: () => void
}

const AddCarModal: FC<TAddCarModalProps> = () => {
  console.log("--Render Modal AddCar");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  return (
    <div>
      <Fab color="primary" aria-label="add-car" size="small"
        onClick={() => handleOpen()}
        sx={{
          backgroundColor: '#078c75', marginTop: '1rem',
          '&:hover': {
            bgcolor: 'rgb(7, 140, 117, 0.5)',
          }
        }}
      >
        <AddIcon />
      </Fab>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default AddCarModal;