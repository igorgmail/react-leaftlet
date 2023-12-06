import React, { useState, useEffect, FC } from "react"

import { Container, Stack, Box, Typography, Grid } from "@mui/material"


import { ICarObject } from "../types/carsSettingsTypes";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import CarsSmallScreen from "./CarsSmallScreen";
import CarsLadgeScreen from "./CarsLadgeScreen";
import AddCarModal from "./AddCarModal";

import '../styles/style.css'





interface ICarsBlockProps {
  carsData: ICarObject[]
}
const CarsBlock: FC<ICarsBlockProps> = ({ carsData }) => {
  console.log("--Render CarsBlock");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  return (
    <Stack sx={{ whidth: '100%' }}>
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
          marginBottom: '0',
          position: 'sticky',
          top: '0',
          zIndex: '1500'
        }}>
        <Typography variant="h6" align="left" gutterBottom sx={{ marginBottom: '0' }}>
          Автомобили
        </Typography>
      </Stack>
      {!isSmallScreen ? (
        <CarsLadgeScreen carsData={carsData} />
      ) : (
        <CarsSmallScreen carsData={carsData} />
      )}
      <AddCarModal />
    </Stack>
  )
}
export default CarsBlock




