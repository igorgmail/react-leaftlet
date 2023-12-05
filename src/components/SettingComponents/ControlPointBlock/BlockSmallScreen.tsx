import React, { useState, useEffect, FC } from "react"

import { Container, Stack, Box, Typography, Grid } from "@mui/material"


import { ICarObject } from "../types/carsSettingsTypes";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


import { TPointsData } from "../types/carsSettingsTypes";

interface IPointDataProps {
  pointData: TPointsData[]
}

const BlockSmallScreen: FC<IPointDataProps> = () => {
  return (
    <div>BlockSmallScreen</div>
  )
}
export default BlockSmallScreen