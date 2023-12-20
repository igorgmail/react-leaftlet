import React, { useState } from "react"

import { Stack } from "@mui/material"


import ModalWrap from "../../components/ModalWrap";

import AddCarForm from "./AddCarForm";
import useBackDrop from "../../hooks/useBackdrop";
import useApi from "../../hooks/useApi";
import { ICarObject, ICarObjectThree, IRequestOptions, TAddCarObject } from "../../types/carsSettingsTypes";
import API_ENDPOINTS from "../../utils/apiEndpoints";
import { carsSettingsActions, useAppDispatch } from "../../../../store";
import DataExtractor from "../../utils/dataExtractor";
import useAlert from '../../hooks/useAlert'

const AddCarModal = () => {
  console.log("--Render Modal AddCar");

  const [open, setOpen] = useState(false);
  const { sendRequest } = useApi();
  const dispatch = useAppDispatch()
  const { startBackDrop, stopBackDrop, BackDropComponent } = useBackDrop();
  const { showAlert, alertComponent } = useAlert()

  const handleClose = () => setOpen(false);

  const handleFormSubmit = (carData: Omit<ICarObjectThree, 'car_id'>) => {
    startBackDrop()
    setOpen(false)
    // const cardataForServer = DataExtractor.createCarDataForServer(carData)
    fetchAddNewCar(carData)
      .then((data) => {
        if (data.status === 'Ok') {
          stopBackDrop()
          const newIconPath = DataExtractor.createiconPath(data.car.pic)
          // console.log("▶ ⇛ newIconPath:", newIconPath);
          dispatch(carsSettingsActions.setCreateCar({ ...data.car, pic: newIconPath }))
          // dispatch(carsSettingsActions.setCreateCar({ ...data.car }))
        } else {
          console.info("Не удалось создать Авто,");
          console.info("С сервера не пришли данные, или пришли неверные данные");
          stopBackDrop()
          showAlert('Не удалось создать Авто', 'error')
        }
      })
      .catch((err) => console.log("ERROR При создании Авто", err)
      )
      .finally(() => stopBackDrop())
  }


  const fetchAddNewCar = async (data: Omit<ICarObjectThree, 'car_id'>) => {
    const requestOptions: IRequestOptions = {
      method: 'GET',
      // body: JSON.stringify({ ...data }),
    };
    const param = `car_name=${data.car_name}&icon=${data.icon}&imei=${data.imei}&alter_imei=${data.alter_imei}`
    const response = await sendRequest(API_ENDPOINTS.CREATE_CAR + `?` + param, requestOptions)

    if (response.data.status === 'error') {
      console.warn("Error in create new car", response.data.message)
      return response.data
    }
    if (response.data.status === 'Ok') {
      const carData = await response.data.car
      console.info("▶FROMSERVER ⇛ Создан новый авто");
      console.info("▶FROMSERVER ⇛ CREATE_CAR", carData);

      return response.data
    }
  }

  return (
    <>
    <Stack display={'flex'} flexDirection={'row'} justifyContent={'flex-start'}
      sx={{ width: '80%' }}
    >

      <ModalWrap modalTitle={'Добавление Автомобиля'} open={open} setOpen={setOpen}>

        <AddCarForm handleClose={handleClose} handleFormSubmit={handleFormSubmit} />

      </ModalWrap>

      </Stack >
      {BackDropComponent}
      {alertComponent}
    </>

  );
}

export default AddCarModal;