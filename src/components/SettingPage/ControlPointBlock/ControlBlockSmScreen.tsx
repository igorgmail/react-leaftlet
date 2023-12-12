import React, { useState, useEffect, FC } from "react"

import { Container, Stack, Box, Typography, Grid, Divider } from "@mui/material"


import { ICarObject, TRemoveDialogCallback } from "../types/carsSettingsTypes";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


import { TPointsData } from "../types/carsSettingsTypes";
import RemoveDialog from "../components/RemoveDialog";
import SmFieldPoints from "./SmFieldPoints";

interface IPointDataProps {
  pointData: TPointsData[]
}

const ControlBlockSmScreen: FC<IPointDataProps> = ({ pointData }) => {


  const handleDialog = (eventData: TRemoveDialogCallback) => {
    console.log("▶ ⇛ eventData:", eventData);
  }

  const makeEventData = (point: TPointsData) => {

    const eventData = {
      event: 'REMOVE_POINT',
      subjectid: point.point_id,
      msg: `Будет удалена контрольная точка <br>${point.name}`
    }

    return eventData
  }

  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>

      {pointData.map((point) => (

        <SmFieldPoints onePoint={point} key={`smpoint-${point.point_id}`} />
      ))
      }




    </Box >
  )
}
export default ControlBlockSmScreen