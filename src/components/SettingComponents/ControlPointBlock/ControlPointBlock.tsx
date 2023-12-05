import React, { useState, useEffect, FC } from "react"

import { Container, Stack, Box, Typography, Grid } from "@mui/material"


import { ICarObject } from "../types/carsSettingsTypes";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import BlockSmallScreen from "./BlockSmallScreen";
import BlockLadgeScreen from "./BlockLadgeScreen";
import AddPoint from "./AddPoint";
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
      {!isSmallScreen ? (
        <BlockLadgeScreen pointData={pointData} />
      ) : (
        <BlockSmallScreen pointData={pointData} />
      )}
      <AddPoint />
    </Stack>
  )
}
export default ControlPointBlock