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
import AddCar from "./AddCar";

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


  return (
    <Stack sx={{ whidth: '100%' }}>

      {!isSmallScreen ? (<CarsLadgeScreen carsData={carsData} />
      ) : (
        <CarsSmallScreen carsData={carsData} />
      )}
      <AddCar />
    </Stack>
  )
}
export default CarsBlock




