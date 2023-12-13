import React, { useState, useEffect, FC } from "react"

import { Fab, Box, Typography, Modal, Fade, Stack, Grid, Button, TextField, IconButton, Divider } from "@mui/material"

// Icons
import AddIcon from '@mui/icons-material/Add';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

import Backdrop from '@mui/material/Backdrop';
import AddModalWithIcons from "./AddModalWithIcons";

import { useAppSelector } from "../../../../store";
import { ICarObject } from "../../types/carsSettingsTypes";


type TAddCarForm = {
  handleClose: () => void,
  handleFormSubmit: (carData: Omit<ICarObject, 'car_id'>) => void
}


const AddCarForm: FC<TAddCarForm> = ({ handleClose, handleFormSubmit }) => {

  const iconsCars = useAppSelector((store) => store.carsSettings.icons)


  const [nameCar, setNameCar] = useState('')
  const [iconCar, setIconCar] = useState<string>('')
  const [imeiCar, setImeiCar] = useState('')
  const [alterImeiCar, setAlterImeiCar] = useState('')
  const [modalOpen, setModalOpen] = useState(false);


  const handleImeiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const re = /^[0-9\b]+$/; // Регулярное выражение для проверки на число

    if (value === '' || re.test(value)) {
      setImeiCar(value);
    }
  };


  const handleIconCarInNetClick = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLImageElement;
    if (target.dataset.iconid) {
      const chooseIconUrl = iconsCars.find((obj) => obj.icon_id === String(target.dataset.iconid))
      setIconCar(chooseIconUrl?.url || '')
    }
    setModalOpen(false)
  }

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
    handleFormSubmit(carData)
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
              <label htmlFor="carNameInput">Имя</label>
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
                placeholder="имя автомобиля"
                value={nameCar}
                required
              />
            </Stack>
          </Grid>

          {/* Иконка авто */}
          <Grid item xs={3} sx={{ borderTopLeftRadius: '8px' }} display={'flex'} alignItems={'center'}>
            <Stack >
              <label htmlFor="carIconInput">Иконка</label>
            </Stack>
          </Grid>
          <Grid item xs={9}>
            {/* <Stack display={'flex'}> */}
            <AddModalWithIcons
              handleIconCarInNetClick={handleIconCarInNetClick}
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
            >

              <Stack className="modal-input modal-input--car-icon" sx={{ width: '100%' }}>
                {iconCar ? (
                  <img src={iconCar} className='icon-car--in-modal'></img>
                ) : <DirectionsCarIcon />
                }
              </Stack>
            </AddModalWithIcons>
          </Grid>

          {/* imei Avto */}
          <Grid item xs={3} sx={{ borderTopLeftRadius: '8px' }} display={'flex'} alignItems={'center'}>
            <Stack >
              <label htmlFor="carImeiInput">Imei</label>
            </Stack>
          </Grid>
          <Grid item xs={9}>
            <Stack display={'flex'}>
              <input
                onChange={(e) => setImeiCar(e.target.value)}
                id="carImeiInput"
                // readOnly={true}
                className="modal-input"
                placeholder="imei"
                value={imeiCar}
                required
                type="number"
                minLength={15}
                maxLength={15}
              />
            </Stack>
          </Grid>

          {/* imei-2 Avto */}
          <Grid item xs={3} sx={{ borderTopLeftRadius: '8px' }} display={'flex'} alignItems={'center'}>
            <Stack >
              <label htmlFor="carAlterImeiInput">Imei-2</label>
            </Stack>
          </Grid>
          <Grid item xs={9}>
            <Stack display={'flex'}>
              <input
                onChange={(e) => setAlterImeiCar(e.target.value)}
                id="carAlterImeiInput"
                // readOnly={true}
                className="modal-input"
                placeholder="альтернативный imei"
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
export default AddCarForm