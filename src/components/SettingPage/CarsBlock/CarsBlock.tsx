import React, { useState, useEffect, FC } from "react"

import { Container, Stack, Box, Typography, Grid } from "@mui/material"


import { ICarObject } from "../types/carsSettingsTypes";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import BlockHeader from "../components/BlockHeader";
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

      <BlockHeader header={'Автомобили'} />
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




