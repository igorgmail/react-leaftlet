import { useState, useEffect, FC } from "react"

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, Stack, Box, Typography, Grid, Button, Divider } from "@mui/material"

import ClearIcon from '@mui/icons-material/Clear';

import { ICarObject, TRemoveDialogCallback } from "../types/carsSettingsTypes";

import { inputCarsDataDisableStyle, inputCarsIconStyle } from "../CompanyBlock/customStyle";
import './styles/style.css'

import RemoveDialog from "./RemoveDialog";

interface ICarsBlockProps {
  carsData: ICarObject[],
}



const CarsLadgeScreen: FC<ICarsBlockProps> = ({ carsData }) => {


  const makeEventData = (carObject: ICarObject) => {

    const eventData = {
      event: 'REMOVE_CAR',
      subjectid: carObject.car_id,
      msg: `Будет удален автомобиль <br>${carObject.name}`
    }

    return eventData
  }

  const handleDialog = (eventData: TRemoveDialogCallback) => {
    console.log("▶ ⇛ eventData:", eventData);

  }

  return (
    <Stack sx={{ flexGrow: 1, overflow: 'hidden' }}>

      <Stack
        display={'flex'} justifyContent={'center'}
        sx={{
          backgroundColor: '#078c75',
          color: 'white',
          borderRadius: '10px',
          // borderTopLeftRadius: '10px',
          // borderTopRightRadius: '10px',
          padding: '.8rem',
          // paddingLeft: '1rem',
          // paddingTop: '1rem',
          marginBottom: '8px'
        }}>
        <Typography variant="h6" align="left" gutterBottom sx={{ marginBottom: '0' }}>
          Автомобили
        </Typography>
      </Stack>

      {/* Header Cars */}
      <Stack
        sx={{ marginBottom: '0' }}
      >
        <Grid container
          rowSpacing={1}
          sx={{
            marginTop: '0.8rem',
            backgroundColor: '#078c75',
            color: 'white',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            paddingLeft: '.8rem'
          }}>

          <Grid item xs={3} md={3} sx={{ borderTopLeftRadius: '8px' }}>
            <Stack >Имя</Stack>
          </Grid>
          <Grid item xs={2} md={3}>
            <Stack display={'flex'} alignItems={'center'}>Иконка</Stack>
          </Grid>
          <Grid item xs={3} md={3}>
            <Stack sx={{ paddingLeft: '8px' }}>Imei</Stack>
          </Grid>
          <Grid item xs={4} md={3}>
            <Stack sx={{ paddingLeft: '8px' }}>Imei-2</Stack>
          </Grid>
        </Grid>


        <Grid container
          sx={{
            backgroundColor: 'white',
            paddingLeft: '.8rem'
          }}
        >

          {carsData.length > 0 && carsData.map((car) => (
            <>
              {/* Name */}
              <Grid item xs={3} md={3} display={'flex'} justifyContent={'flex-start'}>
                <Stack display={'flex'} flexDirection={'row'} alignItems={'center'} >

                  {/* Remove Button */}
                  {/* <Button
                    sx={{
                      minWidth: '10px', width: '2rem',
                      "& .MuiButton-startIcon": { margin: "auto" }
                    }}
                    // variant="outlined"
                    startIcon={<ClearIcon sx={{ marginLeft: '0' }} />}></Button> */}
                  <RemoveDialog callback={handleDialog} eventData={makeEventData(car)} />

                  <input
                    readOnly={true}
                    className="inputFocusStyle"
                    style={{
                      ...inputCarsDataDisableStyle,
                      width: `calc(${car.name.length}ch + 22px)`,
                      // margin: 'auto'
                  }}
                    defaultValue={car.name}
                  />
                </Stack>
              </Grid>

              {/* Icon */}
              <Grid item xs={2} md={3} display={'flex'} justifyContent={'center'}>
                <Stack>
                  <Box margin={'auto'} display={'flex'} alignItems={'center'}>
                    <img src={car.pic}
                      style={{ ...inputCarsIconStyle, transform: 'rotate(90deg)', width: '2rem' }}
                      alt="Иконка"></img>
                  </Box>
                </Stack>
              </Grid>

              {/* Imei */}
              <Grid item xs={3} md={3} display={'flex'} alignItems={'center'}>
                <Stack>
                  <input
                    className="inputFocusStyle"
                    style={{ ...inputCarsDataDisableStyle, width: `calc(${car.imei.length}ch + 22px)`, fontSize: '0.8rem' }}
                    type="text"
                    readOnly={true}
                    defaultValue={car.imei} />
                </Stack>
              </Grid>

              {/* Imei-2 */}
              <Grid item xs={4} md={3} display={'flex'} alignItems={'center'}>
                <Stack >
                  <input
                    className="inputFocusStyle"
                    style={{ ...inputCarsDataDisableStyle, width: `calc(${car.alter_imei?.length || 0}ch + 22px)`, fontSize: '0.8rem' }}
                    type="text"
                    readOnly={true}
                    defaultValue={car.alter_imei || ''} />
                </Stack>
              </Grid>
              <Divider />
            </>
          ))
          }

        </Grid>

      </Stack>

    </Stack >


  )
}




export default CarsLadgeScreen