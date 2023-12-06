import React, { useState, useEffect, FC } from "react"

import { Container, Stack, Box, Typography, Grid } from "@mui/material"


import { ICarObject, TEventsData } from "../types/carsSettingsTypes";

import EventLgBlock from "./EventLgBlock";
import EventSmBlock from "./EventSmBlock";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


interface IEventBlockProps {
  eventsData: TEventsData[]
}

const EventBlock: FC<IEventBlockProps> = ({ eventsData }) => {
  console.log("--Render EventsBlock");


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
          marginTop: '2rem',
          position: 'sticky',
          top: '0',
          zIndex: '1500'
        }}>
        <Typography variant="h6" align="left" gutterBottom sx={{ marginBottom: '0' }}>
          События
        </Typography>
      </Stack>
      {!isSmallScreen ? (
        <EventLgBlock eventsData={eventsData} />
      ) : (
        <EventSmBlock eventsData={eventsData} />
      )}
      {/* <AddCarModal /> */}
    </Stack>
  )
}
export default EventBlock