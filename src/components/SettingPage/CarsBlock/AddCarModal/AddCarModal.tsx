import React, { useState } from "react"

import { Stack } from "@mui/material"


import ModalWrap from "../../components/ModalWrap";

import AddCarForm from "./AddCarForm";
import useBackDrop from "../../hooks/useBackdrop";
import useApi from "../../hooks/useApi";
import { ICarObject, IRequestOptions, TAddCarObject } from "../../types/carsSettingsTypes";
import API_ENDPOINTS from "../../utils/apiEndpoints";
import { carsSettingsActions, useAppDispatch } from "../../../../store";
import DataExtractor from "../../utils/dataExtractor";


const AddCarModal = () => {
  console.log("--Render Modal AddCar");

  const [open, setOpen] = useState(false);
  const { sendRequest } = useApi();
  const dispatch = useAppDispatch()
  const { startBackDrop, stopBackDrop, BackDropComponent } = useBackDrop();
  const handleClose = () => setOpen(false);

  const handleFormSubmit = (carData: Omit<ICarObject, 'car_id'>) => {
    startBackDrop()
    setOpen(false)
    const cardataForServer = DataExtractor.createCarDataForServer(carData)
    fetchAddNewPoint(cardataForServer)
      .then((data) => {
        if (data) {
          stopBackDrop()
          dispatch(carsSettingsActions.setCreateCar(data))
        } else {
          console.info("Не удалось создать Авто,");
          console.info("С сервера не пришли данные, или пришли неверные данные");

        }
      })
      .catch((err) => console.log("ERROR При создании Авто", err)
      )
      .finally(() => stopBackDrop())
  }


  const fetchAddNewPoint = async (data: TAddCarObject) => {
    const requestOptions: IRequestOptions = {
      method: 'POST',
      body: JSON.stringify({ ...data }),
    };
    const response = await sendRequest(API_ENDPOINTS.CREATE_CAR, requestOptions)

    if (response.error) {
      console.warn("Error in create new car", response.error);
      return
    }
    if (response) {
      const carData = await response.data.data
      console.info("▶FROMSERVER ⇛ Создан новый авто");
      console.info("▶FROMSERVER ⇛ CREATE_CAR", carData);

      return carData
    }
  }

  return (

    <Stack display={'flex'} flexDirection={'row'} justifyContent={'flex-start'}
      sx={{ width: '80%' }}
    >

      <ModalWrap modalTitle={'Добавление Автомобиля'} open={open} setOpen={setOpen}>

        <AddCarForm handleClose={handleClose} handleFormSubmit={handleFormSubmit} />

      </ModalWrap>

      {BackDropComponent}
    </Stack >

  );
}

export default AddCarModal;