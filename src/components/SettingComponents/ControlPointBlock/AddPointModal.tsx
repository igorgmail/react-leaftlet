import React, { useState, useEffect, FC } from "react"

import { Fab, Box, Typography, Modal, Fade, Stack, Grid, Button, TextField, IconButton } from "@mui/material"

// Icons
import AddIcon from '@mui/icons-material/Add';

import Backdrop from '@mui/material/Backdrop';
import { FileUploadOutlined } from "@mui/icons-material";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

type TAddCarModalProps = {
  // open: boolean,
  // // setOpen: (a: boolean) => void,
  // handleClose: () => void
}

const AddPointModal = () => {
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
        {/* /create_car {“car_name”:”Renault Master”,”icon”: “file_name”,”imei”:”354354654”,”alter_imei”:”ltjewtjew”} */}
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Добавление контрольной точки
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>

              <Stack>
                <Grid container
                  rowSpacing={1}
                >
                  <Grid item xs={4} sx={{ borderTopLeftRadius: '8px' }}>
                    <Stack >
                      <label htmlFor="pointNameInput">Имя</label>
                    </Stack>
                  </Grid>
                  <Grid item xs={8}>
                    <Stack display={'flex'}>
                      <input
                        id="pointNameInput"
                        // readOnly={true}
                        className="inputFocusStyle"
                        placeholder="имя точки"

                      />
                    </Stack>
                  </Grid>


                  {/* Иконка авто */}
                  <Grid item xs={4} sx={{ borderTopLeftRadius: '8px' }}>
                    <Stack >
                      <label htmlFor="pointAddressInput">Адрес</label>
                    </Stack>
                  </Grid>
                  <Grid item xs={8}>
                    <Stack display={'flex'}>

                      <input
                        type="Text"
                        id="pointAddressInput"
                        // readOnly={true}
                        className="inputFocusStyle"
                        placeholder="Адресс"
                      />
                    </Stack>
                  </Grid>

                  {/* Point Lat */}
                  <Grid item xs={4} sx={{ borderTopLeftRadius: '8px' }}>
                    <Stack >
                      <label htmlFor="pointLatInput">Широта</label>
                    </Stack>
                  </Grid>
                  <Grid item xs={8}>
                    <Stack display={'flex'}>
                      <input
                        id="pointLatInput"
                        // readOnly={true}
                        className="inputFocusStyle"
                        placeholder="50.5647"
                      />
                    </Stack>
                  </Grid>

                  {/* Point Lng */}
                  <Grid item xs={4} sx={{ borderTopLeftRadius: '8px' }}>
                    <Stack >
                      <label htmlFor="pointLngInput">Долгота</label>
                    </Stack>
                  </Grid>
                  <Grid item xs={8}>
                    <Stack display={'flex'}>
                      <input
                        id="pointLngInput"
                        // readOnly={true}
                        className="inputFocusStyle"
                        placeholder="55.2547"
                      />
                    </Stack>
                  </Grid>

                  {/* imei-2 Avto */}
                  <Grid item xs={4} sx={{ borderTopLeftRadius: '8px' }}>
                    <Stack >
                      <label htmlFor="pointRadiusInput">Радиус</label>
                    </Stack>
                  </Grid>
                  <Grid item xs={8}>
                    <Stack display={'flex'}>
                      <input
                        id="pointRadiusInput"
                        // readOnly={true}
                        className="inputFocusStyle"
                        placeholder="радиус"
                      />
                    </Stack>
                  </Grid>

                </Grid>

                <Stack display={'flex'} flexDirection={'row'} justifyContent={'center'} gap={'2rem'}
                  sx={{ marginTop: '1rem' }}
                >
                  <Button>Добавить</Button>
                  <Button onClick={handleClose}>Отмена</Button>
                </Stack>
              </Stack>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
export default AddPointModal