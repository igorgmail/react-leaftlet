import React, { useState, useEffect, FC } from "react"

import { Container, Stack, Box, Typography, Grid } from "@mui/material"


import { ICarObject } from "../types/carsSettingsTypes";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import ControlBlockSmScreen from "./ControlBlockSmScreen";
import ControlBlockLgScreen from "./ControlBlockLgScreen";
import AddPointModal from "./AddPointModal";
import { TPointsData } from "../types/carsSettingsTypes";


interface IPointDataProps {
  pointData: TPointsData[]
}
const ControlPointBlock: FC<IPointDataProps> = ({ pointData }) => {
  console.log("--Render ControlPointBlock");

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
          marginBottom: '8px',
          marginTop: '2rem',
        }}>
        <Typography variant="h6" align="left" gutterBottom sx={{ marginBottom: '0' }}>
          Контрольные точки
        </Typography>
      </Stack>
      {!isSmallScreen ? (
        <ControlBlockLgScreen pointData={pointData} />
      ) : (
          <ControlBlockSmScreen pointData={pointData} />
      )}
      <AddPointModal />
    </Stack>
  )
}
export default ControlPointBlock