import React, { useState, useEffect, FC } from "react"

import { Fab, Box, Typography, Modal, Fade, Stack, Grid, Button, TextField, IconButton, Divider } from "@mui/material"

// Icons
import AddIcon from '@mui/icons-material/Add';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

import Backdrop from '@mui/material/Backdrop';

import { useAppSelector } from "../../../../store";
import { TEventsData } from "../../types/carsSettingsTypes";



type TAddEventForm = {
  handleClose: () => void,
  handleFormSubmit: (carData: Omit<TEventsData, 'event_id'>) => void
}


const EventModalForm: FC<TAddEventForm> = ({ handleClose, handleFormSubmit }) => {

  const [nameCar, setNameCar] = useState('')
  const [iconCar, setIconCar] = useState<string>('')
  const [imeiCar, setImeiCar] = useState('')
  const [alterImeiCar, setAlterImeiCar] = useState('')
  const [modalOpen, setModalOpen] = useState(false);


  const clearState = () => {
    // Очистка формы
    setNameCar('');
    setIconCar('');
    setImeiCar('');
    setAlterImeiCar('');
  }
  const handleAddCarSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const carData = {
      name: nameCar,
      pic: iconCar,
      imei: imeiCar,
      alter_imei: alterImeiCar
    }
    // handleFormSubmit(carData)
    // clearState()
  }
  const handleCancelButton = () => {
    clearState()
    handleClose()
  }

  return (
    <Stack>
      <form onSubmit={handleAddCarSubmit}>
        <Grid container
          rowSpacing={1}

        >
          <Grid item xs={3} sx={{ borderTopLeftRadius: '8px' }} display={'flex'} alignItems={'center'}>
            <Stack >
              <label htmlFor="carNameInput">Автомобиль</label>
            </Stack>
          </Grid>
          {/* Name */}
          <Grid item xs={9}>
            <Stack display={'flex'}>
              <input
                onChange={(e) => setNameCar(e.target.value)}
                id="carNameInput"
                // readOnly={true}
                className="modal-input"

                value={nameCar}
                required
              />
            </Stack>
          </Grid>

          {/* Точка */}
          <Grid item xs={3} sx={{ borderTopLeftRadius: '8px' }} display={'flex'} alignItems={'center'}>
            <Stack >
              <label htmlFor="carImeiInput">Точка</label>
            </Stack>
          </Grid>
          <Grid item xs={9}>
            <Stack display={'flex'}>
              <input
                onChange={(e) => setImeiCar(e.target.value)}
                id="carImeiInput"
                // readOnly={true}
                className="modal-input"

                value={imeiCar}
                required
                type="number"
                minLength={15}
                maxLength={15}
              />
            </Stack>
          </Grid>

          {/* Событие */}
          <Grid item xs={3} sx={{ borderTopLeftRadius: '8px' }} display={'flex'} alignItems={'center'}>
            <Stack >
              <label htmlFor="carImeiInput">Событие</label>
            </Stack>
          </Grid>
          <Grid item xs={9}>
            <Stack display={'flex'}>
              <input
                onChange={(e) => setImeiCar(e.target.value)}
                id="carImeiInput"
                // readOnly={true}
                className="modal-input"

                value={imeiCar}
                required
                type="number"
                minLength={15}
                maxLength={15}
              />
            </Stack>
          </Grid>

          {/* Ожидание */}
          <Grid item xs={3} sx={{ borderTopLeftRadius: '8px' }} display={'flex'} alignItems={'center'}>
            <Stack >
              <label htmlFor="carAlterImeiInput">Ожидание</label>
            </Stack>
          </Grid>
          <Grid item xs={9}>
            <Stack display={'flex'}>
              <input
                onChange={(e) => setAlterImeiCar(e.target.value)}
                id="carAlterImeiInput"
                // readOnly={true}
                className="modal-input"

                value={alterImeiCar}
                required
                type="number"
                minLength={15}
                maxLength={15}
              />
            </Stack>
          </Grid>
        </Grid>

        <Stack display={'flex'} flexDirection={'row'} justifyContent={'center'} gap={'2rem'}
          sx={{ marginTop: '1rem' }}
        >
          <Button type="submit">Добавить</Button>
          <Button onClick={handleCancelButton}>Отмена</Button>
        </Stack>
      </form>
    </Stack>
  )
}
export default EventModalForm