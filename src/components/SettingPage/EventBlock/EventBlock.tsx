import React, { useState, useEffect, FC } from "react"

import { Container, Stack, Box, Typography, Grid } from "@mui/material"


import { ICarObject, TEventsData } from "../types/carsSettingsTypes";

import EventLgBlock from "./EventLgBlock";
import EventSmBlock from "./EventSmBlock";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import BlockHeader from "../components/BlockHeader";
import { useAppSelector, store } from "../../../store";
import AddEventModal from "./AddModal/AddEventModal";


interface IEventBlockProps {
  setUpdateForm: React.Dispatch<React.SetStateAction<boolean>>
}

const EventBlock: FC<IEventBlockProps> = ({ setUpdateForm }) => {
  console.log("--Render EventsBlock");
  const eventsFromStore = useAppSelector((store) => store.carsSettings.events)

  const [eventsData, setEventsData] = useState(eventsFromStore)
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  useEffect(() => {
    setEventsData(store.getState().carsSettings.events)
  }, [eventsFromStore])

  return (
    <Stack sx={{ whidth: '100%' }}>
      <BlockHeader header={"События"} />
      {!isSmallScreen ? (
        <EventLgBlock eventsData={eventsData} setUpdateForm={setUpdateForm} />
      ) : (
          <EventSmBlock eventsData={eventsData} setUpdateForm={setUpdateForm} />
      )}
      <AddEventModal />
    </Stack>
  )
}
export default EventBlock