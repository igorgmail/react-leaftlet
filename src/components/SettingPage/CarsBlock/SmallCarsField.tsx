import { Divider, Grid, Stack, Typography } from "@mui/material"
import { ICarObject, TRemoveDialogCallback } from "../types/carsSettingsTypes";
import { FC, ReactElement, ReactEventHandler, useEffect, useRef, useState } from "react";
import { makeEventData } from "./utils/makeEventData";
import RemoveDialog from "../components/RemoveDialog";
import { useAppDispatch, useAppSelector, carsSettingsActions } from "../../../store";
import IconsCarsMenu from "./CarsIconMenu/IconsCarsMenu";




interface ISmallCarsProps {
  car: ICarObject
}


const SmallCarsField: FC<ISmallCarsProps> = ({ car }) => {


  const handleDialog = (eventData: TRemoveDialogCallback) => {
    console.log("▶ ⇛ eventData:", eventData);

  }

  const handleIconCarInNetClick = (e: React.MouseEvent) => {
    const target = e.currentTarget
    console.log("▶ handleImageClick target:", target);
  }


  return (
    <Grid
      container alignItems="center" justifyContent="center"
      sx={{
        backgroundColor: 'white',
        marginTop: '2rem',
        borderRadius: '10px'
      }}>

      {/* Block - 1 */}
      <Grid item xs={6}>
        <Stack sx={{
          backgroundColor: '#078c75',
          color: 'white',
          borderTopLeftRadius: '10px',
        }}>

          <Typography align="center">Имя</Typography>
        </Stack>

      </Grid>

      <Grid item xs={6}>
        <Stack sx={{ backgroundColor: '#078c75', color: 'white', borderTopRightRadius: '10px', }}>
          <Typography align="center">Иконка</Typography>
        </Stack>

      </Grid>

      {/* Name */}
      <Grid item xs={6}>
        <Stack display={'flex'} flexDirection={'row'} justifyContent={'flex-start'}>

          <RemoveDialog callback={handleDialog}
            eventData={makeEventData(car)} />

          <input
            className="all-white-input-style"
            style={{
              width: `calc(${car.name.length}ch + 22px)`,
            }}
            type="text"
            readOnly={true}
            defaultValue={car.name} />
        </Stack>
      </Grid>

      {/* Icon */}
      <Grid item xs={6}>
        <Stack display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <IconsCarsMenu handleIconCarInNetClick={handleIconCarInNetClick}>
            <img
              className="carblock-icon-cars"
              src={car.pic}
              style={{ transform: 'rotate(90deg)', width: '2rem' }}
              alt="Иконка"></img>
          </IconsCarsMenu>
        </Stack>
      </Grid>

      {/* Block - 2 */}
      <Grid item xs={6}>
        <Stack sx={{ backgroundColor: '#078c75', color: 'white' }}>
          <Typography align="center">Imei</Typography>
        </Stack>
      </Grid>

      <Grid item xs={6}>
        <Stack sx={{ backgroundColor: '#078c75', color: 'white' }}>
          <Typography align="center">Imei 2</Typography>

        </Stack>
      </Grid>

      {/* Imei */}
      <Grid item xs={6}>
        <Stack display={'flex'} justifyContent={'center'} alignItems={'center'}
          sx={{ padding: '8px' }}
        >
          <input
            className="all-white-input-style"
            style={{ width: `calc(${car.imei.length}ch + 22px)` }}
            type="text"
            readOnly={true}
            defaultValue={car.imei || ''} />
        </Stack>
      </Grid>

      {/* Imei-2 */}
      <Grid item xs={6}>
        <Stack display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <input
            className="all-white-input-style"
            style={{ width: `calc(${car.alter_imei?.length || 0}ch + 22px)` }}
            type="text"
            readOnly={true}
            defaultValue={car.alter_imei || ''} />
        </Stack>
      </Grid>

      {/* End Block */}
      <Grid item xs={12}>
        <Stack sx={{
          backgroundColor: '#bfbfbf',
          color: 'white',
          borderBottomRightRadius: '10px',
          borderBottomLeftRadius: '10px',
          height: '1.5rem',

        }}>
        </Stack>

      </Grid>
    </Grid>
  )
}
export default SmallCarsField