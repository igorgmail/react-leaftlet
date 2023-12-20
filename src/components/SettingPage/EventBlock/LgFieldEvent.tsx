import React, { FC, useEffect, useState } from "react";

import { Stack, Grid, Divider } from "@mui/material";

import { TEventForDialog, TEventFromDialog, TEventsData, TRemoveDialogCallback, TSelectedFieldChanged } from "../types/carsSettingsTypes";

import SelectBlock from "../components/SelectBlock";
import { useAppSelector, useAppDispatch, carsSettingsActions } from "../../../store";
import RemoveDialog from "../components/RemoveDialog";
import useBackDrop from "../hooks/useBackdrop";
import useRemoveDialog from "../hooks/useRemoveDialog";
import useUpdateData from "../hooks/useUpdateData";
import useAlert from "../hooks/useAlert";


interface IEventBlockProps {
  oneEvent: TEventsData
  setUpdateForm: React.Dispatch<React.SetStateAction<boolean>>
}

const LgFieldEvent: FC<IEventBlockProps> = ({ oneEvent, setUpdateForm }) => {

  const [eventCompanyId, setEventCompanyId] = useState(oneEvent.company_id)

  const [eventId, setEventId] = useState<string>(oneEvent.event_id)
  const [eventCarId, setEventCarId] = useState<string>(oneEvent.car_id)
  const [eventPointId, setEventPointId] = useState(oneEvent.point_id)
  const [eventType, setEventType] = useState(oneEvent.event) // <'IN' | 'OUT'>
  const [eventTimeSec, setEventTimeSec] = useState(oneEvent.time_response_sec)
  const [timeVariant, setTimeVariant] = useState('сек')

  const { updateDataRequest } = useUpdateData()
  const [selectCar, setSelectCar] = useState(oneEvent.car_id)


  const chooseInputFromStore = useAppSelector((store) => store.carsSettings.config.chooseInputName)

  const { startBackDrop, stopBackDrop, BackDropComponent } = useBackDrop();
  const { showAlert, alertComponent } = useAlert()
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

    const target = e.target as HTMLSelectElement
    // console.log("▶ ⇛ target:", target);
    const objectIndex = target.value
    // console.log("Индекс объекта", objectIndex);
    const selectedIndex = target.options.selectedIndex;
    // console.log("Порядковый номер", selectedIndex);
    // const selectedText = target.options[selectedIndex].text;
    // console.log("Техт объекта:", selectedText);

    const selectedOption = target.options[selectedIndex];
    const selectedData = selectedOption.dataset.optionName;

    if (selectedData === 'event-car') {
      setEventCarId(String(objectIndex))
      dispatch(carsSettingsActions.setCurrentSelectBlock({ ...eventObject, selectBlockObject: { ...eventObject.selectBlockObject, car_id: objectIndex } }))
      startUpdate()
    }
    if (selectedData === 'event-point') {
      setEventPointId(objectIndex)
      dispatch(carsSettingsActions.setCurrentSelectBlock({ ...eventObject, selectBlockObject: { ...eventObject.selectBlockObject, point_id: objectIndex } }))
      startUpdate()
    }
    if (selectedData === 'event-type') {
      setEventType(objectIndex)
      dispatch(carsSettingsActions.setCurrentSelectBlock({ ...eventObject, selectBlockObject: { ...eventObject.selectBlockObject, event: objectIndex } }))
      startUpdate()
    }
  }

  const handleTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value
    setEventTimeSec(time)
    dispatch(carsSettingsActions.setCurrentSelectBlock({ ...eventObject, selectBlockObject: { ...eventObject.selectBlockObject, time_response_sec: time } }))
  }

  function startUpdate() {
    console.log("▶ ⇛ IN startUpdate:");

    // startBackDrop()
    updateDataRequest().then((data) => {
      console.log("▶ ⇛ updateDataRequestdata:", data);

    }).catch((err) => {
      console.warn("При обновлении произошла ошибка ", err);

      showAlert('Ошибка при обновлении', 'error')
      setUpdateForm((cur) => !cur)
    })
  }

  useEffect(() => {
    setEventId(oneEvent.event_id)
    setEventCarId(oneEvent.car_id)
    setEventPointId(oneEvent.point_id)
    setEventType(oneEvent.event)
    setEventTimeSec(oneEvent.time_response_sec)
  }, [oneEvent])


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
            <SelectBlock selectedItem={eventCarId} eventId={oneEvent.event_id} modifier={'CARS'} selectChange={handleSelectChange} />
          </Stack>
        </Grid>

        {/* Точка */}
        <Grid item sm={4} display={'flex'} justifyContent={'center'}>
          <Stack margin={'auto'} display={'flex'} alignItems={'center'}>
            <SelectBlock selectedItem={eventPointId} eventId={oneEvent.event_id} modifier={'POINTS'} selectChange={handleSelectChange} />
          </Stack>
        </Grid>

        {/* Событие */}
        <Grid item sm={2} display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <Stack margin={'auto'} display={'flex'} justifyContent={'center'}>
            <SelectBlock selectedItem={eventType} eventId={oneEvent.event_id} modifier={'EVENTS'} selectChange={handleSelectChange} />
          </Stack>
        </Grid>

        {/* Ожидание */}
        <Grid item sm={1} display={'flex'} alignItems={'center'}>
          <Stack margin={'auto'} display={'flex'} alignItems={'end'}>
            <input
              data-option-name={'event-time'}
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
      {BackDropComponent}
      {alertComponent}
    </>
  )
}
export default LgFieldEvent