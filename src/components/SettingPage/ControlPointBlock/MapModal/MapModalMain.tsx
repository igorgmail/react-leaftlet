import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { Stack } from '@mui/material';
import Map from './Map';
import { FC, useState } from 'react';
import { store } from '../../../../store/store';
import { LatLng } from 'leaflet';


const style = {
  position: 'absolute' as 'absolute',
  top: '10px',
  left: '10px',
  // transform: 'translate(-50%, -50%)',
  width: '95%',
  height: '95vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type TMapModalMain = {
  handleSaveModal: (coord: LatLng) => void
}


const MapModalMain: FC<TMapModalMain> = ({ handleSaveModal }) => {
  console.log("--Render MapModalMain");

  // const config = useAppSelector((store) =)
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleSaveButton = () => {
    const mapCenterFromState = store.getState().carsSettings.config.mapCenter;

    // Передаем в форму
    if (mapCenterFromState) {
      handleSaveModal(mapCenterFromState)
    }
    handleClose()
  }


  return (
    <>
      <Button
        onClick={handleOpen}
        variant="outlined"
        startIcon={<TravelExploreIcon
          sx={{ width: '100%' }}
        />}>
        Выбрать Адрес
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack display={'flex'} flexDirection={'column'} sx={{ height: '100%' }}>
            <Stack display={'flex'}
              sx={{ width: '100%', height: '100%' }}
            >

              <Map></Map>

            </Stack>

            <Stack
              sx={{ width: '100%', height: '2rem' }}
              display={'flex'}
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'center'}
              gap={4}
            >
              <Button onClick={handleClose}>Отменить</Button>
              <Button onClick={handleSaveButton}>Сохранить</Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

export default MapModalMain;