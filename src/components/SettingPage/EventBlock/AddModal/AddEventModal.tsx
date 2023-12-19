import React, { useState } from "react"

import { Stack } from "@mui/material"


import ModalWrap from "../../components/ModalWrap";
import EventModalForm from "./EventModalForm";

import useBackDrop from "../../hooks/useBackdrop";
import useApi from "../../hooks/useApi";
import { ICarObject, IRequestOptions, TAddCarObject, TEventsData, TEventsDataForServer } from "../../types/carsSettingsTypes";
import API_ENDPOINTS from "../../utils/apiEndpoints";
import { carsSettingsActions, useAppDispatch } from "../../../../store";
import DataExtractor from "../../utils/dataExtractor";
import useAlert from "../../hooks/useAlert";



const AddEventModal = () => {

  const [open, setOpen] = useState(false);

  const { sendRequest } = useApi();
  const dispatch = useAppDispatch()
  const { startBackDrop, stopBackDrop, BackDropComponent } = useBackDrop();
  const { showAlert, alertComponent } = useAlert()

  const handleClose = () => setOpen(false);

  const handleFormSubmit = (eventData: Omit<TEventsData, 'event_id'>) => {
    startBackDrop()
    setOpen(false)
    // const cardataForServer = DataExtractor.createEventDataForServer(eventData)

    fetchAddNewEvent(eventData)
      .then((data) => {
        if (data.status === 'Ok') {
          stopBackDrop()
          dispatch(carsSettingsActions.setCreateEvent(data.point))
        } else {
          console.info("Не удалось создать Событие,");
          console.info("С сервера не пришли данные, или пришли неверные данные");
          showAlert('Не удалось создать событие', 'error')
        }
      })
      .catch((err) => console.log("ERROR При создании События", err)
      )
      .finally(() => stopBackDrop())
  }

  const fetchAddNewEvent = async (data: Omit<TEventsData, 'event_id'>) => {
    const requestOptions: IRequestOptions = {
      method: 'POST',
      // body: JSON.stringify({ ...data }),
    };
    const url = `?car_id=${data.car_id}&point_id=${data.point_id}&event=${data.event}&time_response_sec=${data.time_response_sec}`
    const response = await sendRequest(API_ENDPOINTS.CREATE_EVENT + url, requestOptions)

    if (response.data.status === 'error') {
      console.warn("Error in create new Event", response.error);
      return response.data
    }
    if (response.data.status === 'Ok') {
      const eventData = await response.data.event
      console.info("▶FROMSERVER ⇛ Создано новое событие");
      console.info("▶FROMSERVER ⇛ CREATE_EVENTS", eventData);

      return eventData
    }
  }

  return (
    <>

    <Stack display={'flex'} flexDirection={'row'} justifyContent={'flex-start'}
      sx={{ width: '80%' }}
    >

      <ModalWrap modalTitle={'Добавление События'} open={open} setOpen={setOpen}>

        <EventModalForm handleClose={handleClose} handleFormSubmit={handleFormSubmit} />

      </ModalWrap>

      </Stack >
      {BackDropComponent}
      {alertComponent}
    </>
  )
}
export default AddEventModal