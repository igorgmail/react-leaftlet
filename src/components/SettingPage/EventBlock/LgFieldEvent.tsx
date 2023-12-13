import React, { FC, useState } from "react";

import { Stack, Grid, Divider } from "@mui/material";

import { TEventForDialog, TEventFromDialog, TEventsData, TRemoveDialogCallback } from "../types/carsSettingsTypes";

import SelectBlock from "./SelectBlock";
import { useAppSelector, useAppDispatch, carsSettingsActions } from "../../../store";
import RemoveDialog from "../components/RemoveDialog";
import useBackDrop from "../hooks/useBackdrop";
import useRemoveDialog from "../hooks/useRemoveDialog";


interface IEventBlockProps {
  oneEvent: TEventsData
}

const LgFieldEvent: FC<IEventBlockProps> = ({ oneEvent }) => {

  const [selectCar, setSelectCar] = useState(oneEvent.car_id)


  const { startBackDrop, stopBackDrop, BackDropComponent } = useBackDrop();
  const { sendRemove } = useRemoveDialog()
  const dispatch = useAppDispatch()


  const handleDialog = (eventData: TEventFromDialog) => {
    startBackDrop()
    sendRemove(eventData)
      .then((data) => {
        if (data.data) {
          const id = data.data.data
          dispatch(carsSettingsActions.setRemovePoint(id))
          stopBackDrop()
        } else {
          console.info("При удалении Точки с сервера пришли некорректные данные");

        }
      }).catch((err) => {
        console.warn("ERROR, Ошибка при удалении Точки", err);
      }).finally(() => stopBackDrop())
  }

  const makeEventData = (event: TEventsData) => {
    const eventData: TEventForDialog = {
      event: 'REMOVE_EVENT',
      subjectid: event.event_id,
      msg: `Будет удалена контрольная точка <br>${event.event_id}`
    }

    return eventData
  }

  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("EEE- Value>", e.target.value);
    const selectedIndex = e.target.options.selectedIndex;
    console.log("▶ ⇛ selectedIndex:", selectedIndex);
    const selectedText = e.target.options[selectedIndex].text;
    console.log("▶ ⇛ selectedText:", selectedText);
    // console.log("EEE- Key>", e.target);

  }
  return (
    <>

      <Grid
        key={`events-block-` + oneEvent.event_id}
        container
        sx={{
          backgroundColor: 'white',
          paddingLeft: '.8rem'
        }}
      >
        {/* Автомобиль */}
        <Grid item xs={4} display={'flex'} justifyContent={'flex-start'}>
          <Stack display={'flex'} flexDirection={'row'} alignItems={'center'} >

            {/* Remove Button */}
            <RemoveDialog callback={handleDialog} eventData={makeEventData(oneEvent)} />
            <SelectBlock eventId={oneEvent.event_id} modifier={'CARS'} selectChange={selectChange} />
            {/* <input
              readOnly={true}
              className="all-white-input-style"
              style={{
                width: `calc(${oneEvent.event.length}ch + 22px)`,
                // margin: 'auto'
              }}
              defaultValue={oneEvent.event}
            /> */}
          </Stack>
        </Grid>

        {/* Точка */}
        <Grid item xs={4} display={'flex'} justifyContent={'center'}>
          <Stack margin={'auto'} display={'flex'} alignItems={'center'}>
            <SelectBlock eventId={oneEvent.event_id} modifier={'POINTS'} selectChange={selectChange} />
          </Stack>
        </Grid>

        {/* Событие */}
        <Grid item xs={2} display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <Stack margin={'auto'} display={'flex'} justifyContent={'center'}>
            <SelectBlock eventId={oneEvent.event_id} modifier={'EVENTS'} selectChange={selectChange} />
            {/* <input
              className="all-white-input-style"
              style={{
                width: `calc(${oneEvent.event.length}ch + 22px)`, fontSize: '0.8rem'
              }}
              type="text"
              readOnly={true}
              defaultValue={oneEvent.event} /> */}
          </Stack>
        </Grid>

        {/* Ожидание */}
        <Grid item xs={2} display={'flex'} alignItems={'center'}>
          <Stack margin={'auto'} display={'flex'} alignItems={'end'}>
            <input
              className="all-white-input-style"
              style={{
                width: '100%',
                textAlign: 'center'
              }}
              type="text"
              readOnly={true}
              defaultValue={oneEvent.time_response_sec + ` сек`} />
          </Stack>
        </Grid>
        <Divider />
      </Grid>
      {BackDropComponent}</>
  )
}
export default LgFieldEvent