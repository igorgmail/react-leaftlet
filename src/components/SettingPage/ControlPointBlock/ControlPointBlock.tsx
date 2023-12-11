import React, { useState, useEffect, FC } from "react"

import { Container, Stack, Box, Typography, Grid } from "@mui/material"


import { ICarObject } from "../types/carsSettingsTypes";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import ControlBlockSmScreen from "./ControlBlockSmScreen";
import ControlBlockLgScreen from "./ControlBlockLgScreen";
import AddPointModal from "./AddPointModal/AddPointModal";
import { TPointsData } from "../types/carsSettingsTypes";
import BlockHeader from "../components/BlockHeader";


interface IPointDataProps {
  pointData: TPointsData[]
}
const ControlPointBlock: FC<IPointDataProps> = ({ pointData }) => {
  console.log("--Render ControlPointBlock");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  return (
    <Stack sx={{ whidth: '100%' }}>
      <BlockHeader header={"Контрольные точки"} />
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