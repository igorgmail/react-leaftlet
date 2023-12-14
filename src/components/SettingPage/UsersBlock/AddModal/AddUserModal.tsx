import React, { useState } from "react"

import { Stack } from "@mui/material"


import ModalWrap from "../../components/ModalWrap";

import useBackDrop from "../../hooks/useBackdrop";
import useApi from "../../hooks/useApi";
import { ICarObject, IRequestOptions, TAddCarObject, TEventsData, TUserRole, TUsers } from "../../types/carsSettingsTypes";
import API_ENDPOINTS from "../../utils/apiEndpoints";
import { carsSettingsActions, useAppDispatch } from "../../../../store";
import DataExtractor from "../../utils/dataExtractor";
import UserModalForm from "./UserModalForm";



const AddUserModal = () => {

  const [open, setOpen] = useState(false);

  const { sendRequest } = useApi();
  const dispatch = useAppDispatch()
  const { startBackDrop, stopBackDrop, BackDropComponent } = useBackDrop();


  const handleClose = () => setOpen(false);

  const handleFormSubmit = (userData: TUserRole) => {
    console.log("▶ ⇛ userData:", userData);
    startBackDrop()
    setOpen(false)
    // const cardataForServer = DataExtractor.(eventData)
    fetchAddNewEvent(userData)
      .then((data) => {
        if (data) {
          stopBackDrop()
          dispatch(carsSettingsActions.setCreateUser(data))
        } else {
          console.info("Не удалось создать Событие,");
          console.info("С сервера не пришли данные, или пришли неверные данные");

        }
      })
      .catch((err) => console.log("ERROR При создании События", err)
      )
      .finally(() => stopBackDrop())
  }

  const fetchAddNewEvent = async (data: TUserRole) => {
    const requestOptions: IRequestOptions = {
      method: 'POST',
      body: JSON.stringify({ ...data }),
    };
    const response = await sendRequest(API_ENDPOINTS.CREATE_USER, requestOptions)

    if (response.error) {
      console.warn("Error in create new User", response.error);
      return
    }
    if (response) {
      const eventData = await response.data.data
      console.info("▶FROMSERVER ⇛ Создан новый пользователь");
      console.info("▶FROMSERVER ⇛ CREATE_USER", eventData);

      return eventData
    }
  }

  return (
    <Stack display={'flex'} flexDirection={'row'} justifyContent={'flex-start'}
      sx={{ width: '80%' }}
    >

      <ModalWrap modalTitle={'Добавление Пользователя'} open={open} setOpen={setOpen}>

        <UserModalForm handleClose={handleClose} handleFormSubmit={handleFormSubmit} />

      </ModalWrap>

      {BackDropComponent}
    </Stack >
  )
}
export default AddUserModal
