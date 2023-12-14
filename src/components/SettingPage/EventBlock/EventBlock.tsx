import React, { useState, useEffect, FC } from "react"

import { Container, Stack, Box, Typography, Grid } from "@mui/material"


import { ICarObject, TEventsData } from "../types/carsSettingsTypes";

import EventLgBlock from "./EventLgBlock";
import EventSmBlock from "./EventSmBlock";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import BlockHeader from "../components/BlockHeader";
import { useAppSelector } from "../../../store";
import AddEventModal from "./AddModal/AddEventModal";


// interface IEventBlockProps {
//   eventsData: TEventsData[]
// }

const EventBlock = () => {
  console.log("--Render EventsBlock");

  const eventsData = useAppSelector((store) => store.carsSettings.events)
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  return (
    <Stack sx={{ whidth: '100%' }}>
      <BlockHeader header={"События"} />
      {!isSmallScreen ? (
        <EventLgBlock eventsData={eventsData} />
      ) : (
        <EventSmBlock eventsData={eventsData} />
      )}
      <AddEventModal />
    </Stack>
  )
}
export default EventBlock