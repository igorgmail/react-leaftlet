import React, { useState, useEffect, FC } from "react"

import { Container, Stack, Box, Typography, Grid } from "@mui/material"


import { ICarObject, TEventsData, TRemoveDialogCallback } from "../types/carsSettingsTypes";
import RemoveDialog from "../components/RemoveDialog";




interface IEventBlockProps {
  eventsData: TEventsData[]
}

const EventSmBlock: FC<IEventBlockProps> = ({ eventsData }) => {

  const makeEventData = (eventObject: TEventsData) => {

    const eventData = {
      event: 'REMOVE_CAR',
      subjectid: eventObject.event_id,
      msg: `Будет удалено событие <br>${eventObject.event}`
    }

    return eventData
  }

  const handleDialog = (eventData: TRemoveDialogCallback) => {
    console.log("▶ ⇛ eventData:", eventData);
  }


  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>

      {eventsData.map((oneEvent) => (

        <Grid
          key={`events-block-` + oneEvent.event_id}
          container alignItems="center" justifyContent="center"
          sx={{
            backgroundColor: 'white',
            marginTop: '2rem',
            borderRadius: '10px'
          }}>

          {/* Block - 1 */}
          <Grid item xs={6}>
            <Stack sx={{ backgroundColor: '#078c75', color: 'white', borderTopLeftRadius: '10px', }}>
              <Typography align="center">Автомобиль</Typography>
            </Stack>
          </Grid>

          <Grid item xs={6}>
            <Stack sx={{ backgroundColor: '#078c75', color: 'white', borderTopRightRadius: '10px', }}>
              <Typography align="center">Точка</Typography>
            </Stack>
          </Grid>

          {/* Avto */}
          <Grid item xs={6}>
            <Stack display={'flex'} flexDirection={'row'} justifyContent={'flex-start'}>

              <RemoveDialog callback={handleDialog}
                eventData={makeEventData(oneEvent)} />

              <input
                className="all-white-input-style"
                style={{
                  width: `calc(${oneEvent.event.length}ch + 30px)`,
                }}
                type="text"
                readOnly={true}
                defaultValue={oneEvent.event} />
            </Stack>
          </Grid>

          {/* Point */}
          <Grid item xs={6}>
            <Stack display={'flex'} alignItems={'center'} justifyContent={'center'}>
              <input
                className="all-white-input-style"
                style={{ width: `calc(${oneEvent.event.length}ch + 22px)`, fontSize: '0.8rem' }}
                type="text"
                readOnly={true}
                defaultValue={oneEvent.event} />
            </Stack>
          </Grid>

          {/* Block - 2 */}
          <Grid item xs={12}>
            <Stack sx={{ backgroundColor: '#078c75', color: 'white' }}>
              <Typography align="center">Событие</Typography>
            </Stack>
          </Grid>

          {/* Event */}
          <Grid item xs={6}>
            <Stack display={'flex'} justifyContent={'center'} alignItems={'center'}
              sx={{ padding: '8px' }}
            >
              <input
                className="all-white-input-style"
                style={{ width: `calc(${oneEvent.event.length}ch + 30px)` }}
                type="text"
                readOnly={true}
                defaultValue={oneEvent.event} />
            </Stack>
          </Grid>

          {/* End Block */}
          <Grid item xs={12}>
            <Stack sx={{
              backgroundColor: '#bfbfbf',
              color: 'white',
              borderBottomRightRadius: '10px',
              borderBottomLeftRadius: '10px',
              height: '1.5rem',

            }}>
            </Stack>

          </Grid>
        </Grid>
      ))
      }




    </Box >
  )
}
export default EventSmBlock