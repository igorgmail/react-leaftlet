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

  const [eventCompanyId, setEventCompanyId] = useState(oneEvent.company_id)

  const [eventCarId, setEventCarId] = useState<string>(oneEvent.car_id)
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
        if (data.data) {
          const id = data.data.data
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
      msg: `Будет удалена контрольная точка <br>${event.event_id}`
    }

    return eventData
  }

  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // ! Ложтм все в store перед эти нужна тпрака на сервер
    // ! И проеверить
    const objectIndex = e.target.value
    // console.log("Индекс объекта", objectIndex);

    const selectedIndex = e.target.options.selectedIndex;
    // console.log("Порядковый номер", selectedIndex);

    const selectedText = e.target.options[selectedIndex].text;
    // console.log("Техт объекта:", selectedText);

    const selectedOption = e.target.options[selectedIndex];
    const selectedData = selectedOption.dataset.optionName;

    console.log("DataAttr объекта: ", selectedData);

    if (selectedData === 'event-car') {
      setEventCarId(String(objectIndex))
    }
    if (selectedData === 'event-point') {
      setEventPointId(objectIndex)
    }
    if (selectedData === 'event-type')
      setEventType(selectedText)
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
        <Grid item sm={4} display={'flex'} justifyContent={'flex-start'}>
          <Stack display={'flex'} flexDirection={'row'} alignItems={'center'} >

            {/* Remove Button */}
            <RemoveDialog callback={handleDialog} eventData={makeEventData(oneEvent)} />
            <SelectBlock selectedItem={eventCarId} eventId={oneEvent.event_id} modifier={'CARS'} selectChange={selectChange} />
          </Stack>
        </Grid>

        {/* Точка */}
        <Grid item sm={4} display={'flex'} justifyContent={'center'}>
          <Stack margin={'auto'} display={'flex'} alignItems={'center'}>
            <SelectBlock selectedItem={eventPointId} eventId={oneEvent.event_id} modifier={'POINTS'} selectChange={selectChange} />
          </Stack>
        </Grid>

        {/* Событие */}
        <Grid item sm={2} display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <Stack margin={'auto'} display={'flex'} justifyContent={'center'}>
            <SelectBlock selectedItem={eventType} eventId={oneEvent.event_id} modifier={'EVENTS'} selectChange={selectChange} />
          </Stack>
        </Grid>

        {/* Ожидание */}
        <Grid item sm={1} display={'flex'} alignItems={'center'}>
          <Stack margin={'auto'} display={'flex'} alignItems={'end'}>
            <input
              onClick={handleInputClick}
              onChange={(e) => setEventTimeSec(e.target.value)}
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
        <Grid item sm={1} display={'flex'} alignItems={'center'}>
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
        <Divider />
      </Grid>
      {BackDropComponent}</>
  )
}
export default LgFieldEvent