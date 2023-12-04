import { useState, useEffect, FC } from "react"

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, Stack, Box, Typography, Grid } from "@mui/material"


import { ICarObject } from "../types/carsSettingsTypes";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import CarsSmallScreen from "./CarsSmallScreen";
import CarsLadgeScreen from "./CarsLadgeScreen";

import { inputCarsDataDisableStyle, inputCarsIconStyle } from "../CompanyBlock/customStyle";
import './styles/style.css'

const styleHead = { borderBottom: 'none', padding: '0 1rem 8px', color: 'white', }
const styleCell = { padding: '0 1rem' }



interface ICarsBlockProps {
  carsData: ICarObject[]
}
const CarsBlock: FC<ICarsBlockProps> = ({ carsData }) => {
  console.log("--Render CarsBlock");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  console.log("▶ ⇛ isSmallScreen:", isSmallScreen);


  return (!isSmallScreen ? (<CarsLadgeScreen carsData={carsData} />
  ) : (
    <CarsSmallScreen carsData={carsData} />
    // <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
    //   <Stack
    //     sx={{
    //       backgroundColor: '#078c75',
    //       color: 'white',
    //       borderTopLeftRadius: '10px',
    //       borderTopRightRadius: '10px',
    //       paddingLeft: '1rem',
    //       paddingTop: '1rem'
    //     }}>
    //     <Typography variant="h6" align="left" gutterBottom>
    //       Автомобили
    //     </Typography>
    //   </Stack>


    //   <Grid container alignItems="center" justifyContent="center">

    //     {/* Block - 1 */}

    //     <Grid item xs={6}>
    //       <Stack sx={{ backgroundColor: '#078c75', color: 'white' }}>

    //         <Typography align="center">Имя</Typography>
    //       </Stack>

    //     </Grid>

    //     <Grid item xs={6}>
    //       <Stack sx={{ backgroundColor: '#078c75', color: 'white' }}>
    //         <Typography align="center">Иконка</Typography>

    //       </Stack>

    //     </Grid>

    //     {/* Name */}
    //     <Grid item xs={6}>
    //       <Stack display={'flex'} justifyContent={'center'} alignItems={'center'}>
    //         <input
    //           className="inputFocusStyle"
    //           style={{
    //             ...inputCarsDataDisableStyle,
    //             width: `calc(${carsData[0].name.length}ch + 18px)`,
    //           }}
    //           type="text"
    //           readOnly={true}
    //           defaultValue={carsData[0].name} />
    //       </Stack>
    //     </Grid>

    //     {/* Icon */}
    //     <Grid item xs={6}>
    //       <Stack display={'flex'} alignItems={'center'} justifyContent={'center'}>
    //         {/* <Box width={'40px'} margin={'auto'}> */}
    //         <img src={carsData[0].pic}
    //           style={{ ...inputCarsIconStyle, transform: 'rotate(90deg)', width: '2rem' }}
    //           alt="Иконка"></img>
    //         {/* </Box> */}
    //         {/* <Box component={'img'} src={carsData[0].pic}></Box> */}
    //       </Stack>
    //     </Grid>

    //     {/* Block - 2 */}
    //     <Grid item xs={6}>
    //       <Stack sx={{ backgroundColor: '#078c75', color: 'white' }}>
    //         <Typography align="center">Imei</Typography>
    //       </Stack>
    //     </Grid>

    //     <Grid item xs={6}>
    //       <Stack sx={{ backgroundColor: '#078c75', color: 'white' }}>
    //         <Typography align="center">Imei 2</Typography>

    //       </Stack>
    //     </Grid>

    //     {/* Imei */}
    //     <Grid item xs={6}>
    //       <Stack display={'flex'} justifyContent={'center'} alignItems={'center'}>
    //         <input
    //           className="inputFocusStyle"
    //           style={{ ...inputCarsDataDisableStyle, width: `calc(${carsData[0].imei.length}ch + 20px)` }}
    //           type="text"
    //           readOnly={true}
    //           defaultValue={carsData[0].imei} />
    //       </Stack>
    //     </Grid>

    //     {/* Imei-2 */}
    //     <Grid item xs={6}>
    //       <Stack display={'flex'} justifyContent={'center'} alignItems={'center'}>
    //         <input
    //           className="inputFocusStyle"
    //           style={{ ...inputCarsDataDisableStyle, width: `calc(${carsData[0].alter_imei?.length || 0}ch + 18px)` }}
    //           type="text"
    //           readOnly={true}
    //           defaultValue={carsData[0].alter_imei || ''} />
    //       </Stack>
    //     </Grid>


    //   </Grid>

    // </Box>
  )
  )
}
export default CarsBlock




