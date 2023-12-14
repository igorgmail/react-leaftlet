import React, { useState, useEffect, FC } from "react"

import { Container, Stack, Box, Typography, Grid } from "@mui/material"


import { ICarObject, TEventsData, TEventForDialog, TRemoveDialogCallback, TEventFromDialog } from "../types/carsSettingsTypes";
import RemoveDialog from "../components/RemoveDialog";

import SmFieldEvent from "./SmFieldEvent";


interface IEventBlockProps {
  eventsData: TEventsData[]
}

const EventSmBlock: FC<IEventBlockProps> = ({ eventsData }) => {

  const makeEventData = (eventObject: TEventsData) => {

    const eventData: TEventForDialog = {
      event: 'REMOVE_EVENT',
      subjectid: eventObject.event_id,
      msg: `Будет удалено событие <br>${eventObject.event}`
    }

    return eventData
  }

  const handleDialog = (eventData: TEventFromDialog) => {
    console.log("▶ ⇛ eventData:", eventData);
  }


  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>

      {eventsData.map((oneEvent) => (

        <SmFieldEvent oneEvent={oneEvent} />
      ))
      }




    </Box >
  )
}
export default EventSmBlock