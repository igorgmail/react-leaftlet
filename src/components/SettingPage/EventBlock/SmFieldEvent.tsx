import React, { FC, useState } from "react";

import { Stack, Grid, Divider, Typography } from "@mui/material";

import { TEventForDialog, TEventFromDialog, TEventsData, TRemoveDialogCallback, TSelectedFieldChanged } from "../types/carsSettingsTypes";

import SelectBlock from "../components/SelectBlock";

import { useAppSelector, useAppDispatch, carsSettingsActions } from "../../../store";
import RemoveDialog from "../components/RemoveDialog";
import useBackDrop from "../hooks/useBackdrop";
import useRemoveDialog from "../hooks/useRemoveDialog";




interface IEventBlockProps {
  oneEvent: TEventsData
}

const SmFieldEvent: FC<IEventBlockProps> = ({ oneEvent }) => {


  const [eventCompanyId, setEventCompanyId] = useState(oneEvent.company_id)

  const [eventId, setEventId] = useState<string>(oneEvent.event_id)
  const [eventCarId, setEventCarId] = useState(oneEvent.car_id)
  const [eventPointId, setEventPointId] = useState(oneEvent.point_id)
  const [eventType, setEventType] = useState(oneEvent.event) // <'IN' | 'OUT'>
  const [eventTimeSec, setEventTimeSec] = useState(oneEvent.time_response_sec)
  const [timeVariant, setTimeVariant] = useState('сек')


  const [selectCar, setSelectCar] = useState(oneEvent.car_id)


  const chooseInputFromStore = useAppSelector((store) => store.carsSettings.config.chooseInputName)

  const { startBackDrop, stopBackDrop, BackDropComponent } = useBackDrop();
  const { sendRemove } = useRemoveDialog()
  const dispatch = useAppDispatch()


  const handleDialog = (eventData: TEventFromDialog) => {
    startBackDrop()
    sendRemove(eventData)
      .then((data) => {
        if (data?.data) {
          const id = data.data
          dispatch(carsSettingsActions.setRemoveEvent(id))
          stopBackDrop()
        } else {
          console.info("При удалении События с сервера пришли некорректные данные");

        }
      }).catch((err) => {
        console.warn("ERROR, Ошибка при удалении События", err);
      }).finally(() => stopBackDrop())
  }

  const handleInputClick = (event: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
    event.preventDefault()
    const touchNumber = event.detail

    if (touchNumber === 2) {
      const targ = event.currentTarget
      const dataValue = targ.dataset.forstore
      const inputType = event.currentTarget.type
      targ.focus()

      // ! Этот вариант
      if (dataValue === chooseInputFromStore) return

      if (dataValue) dispatch(carsSettingsActions.setChooseInputName(dataValue))

      // Установка курсора в конец текста
      if (inputType === 'number') {
        targ.type = 'text'
        const textLength = targ.value.length;
        targ.setSelectionRange(textLength, textLength);
        targ.type = 'number'
      } else {
        const textLength = targ.value.length;
        targ.setSelectionRange(textLength, textLength);
      }
    }
  }

  const makeEventData = (event: TEventsData) => {
    const eventData: TEventForDialog = {
      event: 'REMOVE_EVENT',
      subjectid: event.event_id,
      msg: `Будет удалено событие <br> Id события - ${event.event_id}`
    }

    return eventData
  }

  const eventObject: TSelectedFieldChanged = {
    typeField: 'events',
    selectBlockObject: {
      event_id: eventId,
      car_id: eventCarId,
      point_id: eventPointId,
      event: eventType,
      time_response_sec: eventTimeSec

    }
  }


  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // ! Ложтм все в store перед эти нужна тпрака на сервер
    // ! И проеверить
    const target = e.target as HTMLSelectElement
    console.log("▶ ⇛ target:", target);

    const objectIndex = target.value
    console.log("Индекс объекта", objectIndex);

    const selectedIndex = target.options.selectedIndex;
    console.log("Порядковый номер", selectedIndex);

    // const selectedText = target.options[selectedIndex].text;
    // console.log("Техт объекта:", selectedText);

    const selectedOption = target.options[selectedIndex];
    const selectedData = selectedOption.dataset.optionName;

    console.log("DataAttr объекта: ", selectedData);

    if (selectedData === 'event-car') {
      setEventCarId(String(objectIndex))
      dispatch(carsSettingsActions.setCurrentSelectBlock({ ...eventObject, selectBlockObject: { ...eventObject.selectBlockObject, car_id: objectIndex } }))
    }
    if (selectedData === 'event-point') {
      setEventPointId(objectIndex)
      dispatch(carsSettingsActions.setCurrentSelectBlock({ ...eventObject, selectBlockObject: { ...eventObject.selectBlockObject, point_id: objectIndex } }))
    }
    if (selectedData === 'event-type') {
      setEventType(objectIndex)
      dispatch(carsSettingsActions.setCurrentSelectBlock({ ...eventObject, selectBlockObject: { ...eventObject.selectBlockObject, event: objectIndex } }))
    }
    if (selectedData === 'event-time') {
      setEventTimeSec(objectIndex)
      console.log("▶ ⇛ objectIndex:", objectIndex);
      dispatch(carsSettingsActions.setCurrentSelectBlock({ ...eventObject, selectBlockObject: { ...eventObject.selectBlockObject, time_response_sec: objectIndex } }))
    }
  }

  const handleTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value
    console.log("▶ ⇛ time:", time);
    setEventTimeSec(time)
    dispatch(carsSettingsActions.setCurrentSelectBlock({ ...eventObject, selectBlockObject: { ...eventObject.selectBlockObject, time_response_sec: time } }))
  }

  return (
    <>
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
            <SelectBlock selectedItem={eventCarId} eventId={oneEvent.event_id} modifier={'CARS'} selectChange={handleSelectChange} />
          </Stack>
        </Grid>

        {/* Point */}
        <Grid item xs={6}>
          <Stack display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <SelectBlock selectedItem={eventPointId} eventId={oneEvent.event_id} modifier={'POINTS'} selectChange={handleSelectChange} />
          </Stack>
        </Grid>

        {/* Block - 2 */}
        <Grid item xs={6}>
          <Stack sx={{ backgroundColor: '#078c75', color: 'white' }}>
            <Typography align="center">Событие</Typography>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack sx={{ backgroundColor: '#078c75', color: 'white' }}>
            <Typography align="center">Ожидание</Typography>
          </Stack>
        </Grid>

        {/* Event */}
        <Grid item xs={6}>
          <Stack display={'flex'} justifyContent={'center'} alignItems={'center'}
          // sx={{ padding: '8px' }}
          >
            <SelectBlock selectedItem={eventType} eventId={oneEvent.event_id} modifier={'EVENTS'} selectChange={handleSelectChange} />
          </Stack>
        </Grid>

        <Grid item xs={4}>
          <Stack margin={'auto'} display={'flex'} alignItems={'center'}>
            <input
              onClick={handleInputClick}
              onChange={handleTimeInputChange}
              className={chooseInputFromStore === `id${oneEvent.event_id}-event` ? "all-white-input--choose-style" : "all-white-input-style"}
              style={{
                width: '100%',
                textAlign: 'right',
              }}
              type="text"
              readOnly={chooseInputFromStore !== `id${oneEvent.event_id}-event`}
              value={`${eventTimeSec}`}
              data-forstore={`id${oneEvent.event_id}-event`}
              data-interactive

            />
          </Stack>
        </Grid>
        <Grid item xs={2} display={'flex'} alignItems={'center'}>
          <Stack margin={'auto'} display={'flex'} alignItems={'end'}>
            <input
              className={"all-white-input--second"}
              style={{
                width: '100%',
                textAlign: 'center',
              }}
              type="text"
              disabled
              value={timeVariant}
            />
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
      {BackDropComponent}</>
  )
}
export default SmFieldEvent