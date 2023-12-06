import { useState, useEffect, FC } from "react"

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, Stack, Box, Typography, Grid, Divider, Button } from "@mui/material"


import { ICarObject, TRemoveDialogCallback } from "../types/carsSettingsTypes";

import ClearIcon from '@mui/icons-material/Clear';

import '../styles/style.css'
import RemoveDialog from "./RemoveDialog";

interface ICarsBlockProps {
  carsData: ICarObject[]
}

const makeEventData = (carObject: ICarObject) => {

  const eventData = {
    event: 'REMOVE_CAR',
    subjectid: carObject.car_id,
    msg: `Будет удален автомобиль <br>${carObject.name}`
  }

  return eventData
}

const CarsSmallScreen: FC<ICarsBlockProps> = ({ carsData }) => {
  console.log("▶ ⇛ carsData:", carsData);

  const handleDialog = (eventData: TRemoveDialogCallback) => {
    console.log("▶ ⇛ eventData:", eventData);

  }



  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>

      {carsData.map((car) => (
        <Grid
          key={`cars-block-` + car.car_id}

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

                <img
                  className="carblock-icon-cars"
                  src={car.pic}
                  style={{ transform: 'rotate(90deg)', width: '2rem' }}
                  alt="Иконка"></img>

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
      ))
      }




    </Box >
  )
}
export default CarsSmallScreen