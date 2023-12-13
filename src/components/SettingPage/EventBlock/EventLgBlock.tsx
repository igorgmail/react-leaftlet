import React, { FC } from "react";

import { Stack, Grid, Divider } from "@mui/material";

import { TEventForDialog, TEventFromDialog, TEventsData, TRemoveDialogCallback } from "../types/carsSettingsTypes";

import RemoveDialog from "../components/RemoveDialog";
import LgFieldEvent from "./LgFieldEvent";

interface IEventBlockProps {
  eventsData: TEventsData[]
}

const EventLgBlock: FC<IEventBlockProps> = ({ eventsData }) => {


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
    <Stack sx={{ flexGrow: 1, overflow: 'hidden' }}>

      {/* Header Cars */}
      <Stack
        sx={{ marginBottom: '0' }}
      >
        <Grid container
          rowSpacing={1}
          sx={{
            marginTop: '0.8rem',
            backgroundColor: '#078c75',
            color: 'white',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            paddingLeft: '.8rem'
          }}>

          <Grid item xs={4} sx={{ borderTopLeftRadius: '8px' }}>
            <Stack >Автомообиль</Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack display={'flex'} alignItems={'center'}>Точка</Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack sx={{ paddingLeft: '8px' }} display={'flex'} alignItems={'center'}>Событие</Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack sx={{ paddingLeft: '8px' }} display={'flex'} alignItems={'center'}>Ожидание</Stack>
          </Grid>
        </Grid>




        {eventsData.length > 0 && eventsData.map((oneEvent) => (
          <LgFieldEvent oneEvent={oneEvent} key={`eventkey-${oneEvent.event_id}`} />
        ))
        }



      </Stack>

    </Stack >

  )
}
export default EventLgBlock