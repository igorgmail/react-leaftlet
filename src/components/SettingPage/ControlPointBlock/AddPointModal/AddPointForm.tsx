import React, { useState, useEffect, FC } from "react"

import { Fab, Box, Typography, Modal, Fade, Stack, Grid, Button, TextField, IconButton, Divider } from "@mui/material"

// Icons
import AddIcon from '@mui/icons-material/Add';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MapModalMain from "../MapModal/MapModalMain";

type Tcoord = {
  lat: number,
  lng: number
}
type TAddPointForm = {
  handleClose: () => void,
  handleFormSubmit: () => void
}


const AddPointForm: FC<TAddPointForm> = ({ handleClose }) => {

  const [pointName, setPointName] = useState('')
  const [address, setAddress] = useState('')
  const [lat, setLat] = useState<number | null>(null)
  const [lng, setLng] = useState<number | null>(null)
  const [radius, setRadius] = useState('');


  const handleSaveModal = () => {
    // setAddress()
    // if (coord.lat && coord.lng) {
    //   setLat(coord.lat)
    //   setLng(coord.lng)

    // }
  }

  const handleAddPointSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const pointData = {
      point_name: pointName,
      address: address,
      lat: lat,
      lng: lng,
      radius: radius
    }

    console.log("Поинт Дата для сервера", pointData);

  }

  return (
    <Stack>
      <form onSubmit={handleAddPointSubmit}>

        <Grid container
          rowSpacing={1}
        >
          <Grid item xs={3} sx={{ borderTopLeftRadius: '8px' }}>
            <Stack >
              <label htmlFor="pointNameInput">Имя</label>
            </Stack>
          </Grid>

          {/* Point Name */}
          <Grid item xs={9}>
            <Stack display={'flex'}>
              <input
                onChange={(e) => setPointName(e.target.value)}
                id="pointNameInput"
                placeholder="имя точки"
                className="modal-input"
                value={pointName}
                required
              />
            </Stack>
          </Grid>


          {/* Address*/}
          <Grid item xs={3} sx={{ borderTopLeftRadius: '8px' }}>
            <Stack >
              <label htmlFor="pointAddressInput">Адрес</label>
            </Stack>
          </Grid>

          <Grid item xs={9}>
            <Stack display={'flex'}>
              <MapModalMain handleSaveModal={handleSaveModal}></MapModalMain>
            </Stack>
          </Grid>

          {/* Point Lat */}
          <Grid item xs={3} sx={{ borderTopLeftRadius: '8px' }}>
            <Stack >
              <label htmlFor="pointLatInput">Широта</label>
            </Stack>
          </Grid>
          <Grid item xs={9}>
            <Stack display={'flex'}>
              <input
                id="pointLatInput"
                placeholder="50.5647"
                className="modal-input"
                type="number"
                value={String(lat)}
                // required
                disabled
              />
            </Stack>
          </Grid>

          {/* Point Lng */}
          <Grid item xs={3} sx={{ borderTopLeftRadius: '8px' }}>
            <Stack >
              <label htmlFor="pointLngInput">Долгота</label>
            </Stack>
          </Grid>
          <Grid item xs={9}>
            <Stack display={'flex'}>
              <input
                id="pointLngInput"
                placeholder="55.2547"
                className="modal-input"
                type="number"
                value={String(lng)}
                // required
                disabled
              />
            </Stack>
          </Grid>

          {/*Radius*/}
          <Grid item xs={3} sx={{ borderTopLeftRadius: '8px' }}>
            <Stack >
              <label htmlFor="pointRadiusInput">Радиус</label>
            </Stack>
          </Grid>
          <Grid item xs={9}>
            <Stack display={'flex'}>
              <input
                onChange={(e) => setRadius(e.target.value)}
                id="pointRadiusInput"
                placeholder="радиус"
                className="modal-input"
                value={radius}
                required
                type="number"
                min='0'
                max='1000'
              />
            </Stack>
          </Grid>

        </Grid>

        <Stack display={'flex'} flexDirection={'row'} justifyContent={'center'} gap={'2rem'}
          sx={{ marginTop: '1rem' }}
        >
          <Button type="submit">Добавить</Button>
          <Button onClick={handleClose}>Отмена</Button>
        </Stack>
      </form>

    </Stack>
  );
}
export default AddPointForm