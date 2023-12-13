import React, { FC } from "react";

import { Stack, Grid, Divider } from "@mui/material";

import { TEventForDialog, TEventFromDialog, TEventsData, TRemoveDialogCallback } from "../types/carsSettingsTypes";

import RemoveDialog from "../components/RemoveDialog";

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

          <Grid item xs={3} md={3} sx={{ borderTopLeftRadius: '8px' }}>
            <Stack >Автомообиль</Stack>
          </Grid>
          <Grid item xs={2} md={3}>
            <Stack display={'flex'} alignItems={'center'}>Точка</Stack>
          </Grid>
          <Grid item xs={3} md={3}>
            <Stack sx={{ paddingLeft: '8px' }}>Событие</Stack>
          </Grid>
          <Grid item xs={4} md={3}>
            <Stack sx={{ paddingLeft: '8px' }}>Ожидание, сек</Stack>
          </Grid>
        </Grid>




        {eventsData.length > 0 && eventsData.map((oneEvent) => (
          <Grid
            key={`events-block-` + oneEvent.event_id}
            container
            sx={{
              backgroundColor: 'white',
              paddingLeft: '.8rem'
            }}
          >
            {/* Автомобиль */}
            <Grid item xs={3} md={3} display={'flex'} justifyContent={'flex-start'}>
              <Stack display={'flex'} flexDirection={'row'} alignItems={'center'} >

                {/* Remove Button */}
                <RemoveDialog callback={handleDialog} eventData={makeEventData(oneEvent)} />

                <input
                  readOnly={true}
                  className="all-white-input-style"
                  style={{
                    width: `calc(${oneEvent.event.length}ch + 22px)`,
                    // margin: 'auto'
                  }}
                  defaultValue={oneEvent.event}
                />
              </Stack>
            </Grid>

            {/* Точка */}
            <Grid item xs={2} md={3} display={'flex'} justifyContent={'center'}>
              <Stack margin={'auto'} display={'flex'} alignItems={'center'}>

                <input
                  readOnly={true}
                  className="all-white-input-style"
                  style={{
                    width: `calc(${oneEvent.event.length}ch + 22px)`,
                    // margin: 'auto'
                  }}
                  defaultValue={oneEvent.event}
                />
              </Stack>
            </Grid>

            {/* Событие */}
            <Grid item xs={3} md={3} display={'flex'} alignItems={'center'}>
              <Stack>
                <input
                  className="all-white-input-style"
                  style={{
                    width: `calc(${oneEvent.event.length}ch + 22px)`, fontSize: '0.8rem'
                  }}
                  type="text"
                  readOnly={true}
                  defaultValue={oneEvent.event} />
              </Stack>
            </Grid>

            {/* Ожидание */}
            <Grid item xs={4} md={3} display={'flex'} alignItems={'center'}>
              <Stack >
                <input
                  className="all-white-input-style"
                  style={{
                    width: `calc(${oneEvent.time_response_sec}ch + 22px)`, fontSize: '0.8rem'
                  }}
                  type="text"
                  readOnly={true}
                  defaultValue={oneEvent.time_response_sec + ` сек`} />
              </Stack>
            </Grid>
            <Divider />
          </Grid>
        ))
        }



      </Stack>

    </Stack >

  )
}
export default EventLgBlock