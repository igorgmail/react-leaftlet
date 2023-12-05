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


import { ICarObject } from "../types/carsSettingsTypes";

import ClearIcon from '@mui/icons-material/Clear';

import { inputCarsDataDisableStyle, inputCarsIconStyle } from "../CompanyBlock/customStyle";
import './styles/style.css'
import RemoveDialog from "./RemoveDialog";

interface ICarsBlockProps {
  carsData: ICarObject[]
}



const CarsSmallScreen: FC<ICarsBlockProps> = ({ carsData }) => {
  console.log("▶ ⇛ carsData:", carsData);

  const getApprove = (e: any) => {
    console.log("▶ ⇛ e:", e.target);

  }



  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
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
          marginBottom: '0'
        }}>
        <Typography variant="h6" align="left" gutterBottom sx={{ marginBottom: '0' }}>
          Автомобили
        </Typography>
      </Stack>


      {carsData.map((car) => (
        <>
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
                <RemoveDialog
                  getApprove={getApprove}
                  carData={car}></RemoveDialog>

                <input
                  className="inputFocusStyle"
                  style={{
                    ...inputCarsDataDisableStyle,
                    width: `calc(${car.name.length}ch + 18px)`,
                  }}
                  type="text"
                  readOnly={true}
                  defaultValue={car.name} />
              </Stack>
            </Grid>

            {/* Icon */}
            <Grid item xs={6}>
              <Stack display={'flex'} alignItems={'center'} justifyContent={'center'}>
                {/* <Box width={'40px'} margin={'auto'}> */}
                <img src={car.pic}
                  style={{ ...inputCarsIconStyle, transform: 'rotate(90deg)', width: '2rem' }}
                  alt="Иконка"></img>
                {/* </Box> */}
                {/* <Box component={'img'} src={carsData[0].pic}></Box> */}
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
                  className="inputFocusStyle"
                  style={{ ...inputCarsDataDisableStyle, width: `calc(${car.imei.length}ch + 20px)` }}
                  type="text"
                  readOnly={true}
                  defaultValue={car.imei || ''} />
              </Stack>
            </Grid>

            {/* Imei-2 */}
            <Grid item xs={6}>
              <Stack display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <input
                  className="inputFocusStyle"
                  style={{ ...inputCarsDataDisableStyle, width: `calc(${car.alter_imei?.length || 0}ch + 20px)` }}
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
          {/* <Divider sx={{ margin: '4px', borderWidth: '1px', borderColor: 'red' }}></Divider > */}
        </>
      ))
      }




    </Box >
  )
}
export default CarsSmallScreen