import React, { useState, useEffect, FC } from "react"

import { Fab, Box, Typography, Modal, Fade, Stack, Grid, Button, TextField, IconButton, CircularProgress } from "@mui/material"

import { useAppDispatch, carsSettingsActions } from "../../../../store";
import useApi from "../../hooks/useApi";
import useAlert from "../../hooks/useAlert";

import API_ENDPOINTS from "../../utils/apiEndpoints";
import DataExtractor from "../../utils/dataExtractor";
// Icons
import useBackDrop from "../../hooks/useBackdrop";
import ModalWrap from "../../components/ModalWrap";
import AddPointForm from "./AddPointForm";
import { IRequestOptions } from "../../types/carsSettingsTypes";

type TAddCarModalProps = {
  // open: boolean,
  // // setOpen: (a: boolean) => void,
  // handleClose: () => void
}
type TPointData = {

  point_name: string,
  address: string | undefined,
  lat: number | null,
  lng: number | null,
  radius: string

}

const AddPointModal = () => {
  console.log("--Render Modal Add Point");

  const [open, setOpen] = useState(false);
  const { sendRequest } = useApi();

  const { startBackDrop, stopBackDrop, BackDropComponent } = useBackDrop();
  const handleClose = () => setOpen(false);

  const dispatch = useAppDispatch()
  const handleFormSubmit = (pointData: TPointData) => {

    startBackDrop()
    setOpen(false)
    fetchAddNewPoint(pointData)
      .then((data) => {
        if (data) {
          stopBackDrop()
          const extractPointData = DataExtractor.getPointsFromServerData(data)
          console.log("▶ ⇛ extractPointData:", extractPointData);
          dispatch(carsSettingsActions.setNewPoints(extractPointData))
        }
      })
      .finally(() => stopBackDrop())
  }


  const fetchAddNewPoint = async (data: TPointData) => {
    const requestOptions: IRequestOptions = {
      method: 'POST',
      body: JSON.stringify({ ...data }),
    };
    const response = await sendRequest(API_ENDPOINTS.CREATE_POINT, requestOptions)

    if (response.error) {
      console.warn("Error in create new point", response.error);
      return
    }
    if (response) {
      const pointsData = await response.data
      const newPointData = await response.data.pointData
      console.info("▶FROMSERVER ⇛ Создана новая точка");
      console.info("▶FROMSERVER ⇛ CREATE_POINT", pointsData);
      // showAlert('Имя компании изменено успешно', 'success');
      // setShortLink(link)
      // dispatch(carsSettingsActions.setShortLink(link))
      return newPointData
    }
  }




  return (

    <Stack display={'flex'} flexDirection={'row'} justifyContent={'flex-start'}
      sx={{ width: '80%' }}
    >

      <ModalWrap modalTitle={'Добавление Контрольной точки'} open={open} setOpen={setOpen}>
        {/* <Backdrop open={open}><CircularProgress color="inherit" /></Backdrop> */}
        <AddPointForm handleClose={handleClose} handleFormSubmit={handleFormSubmit} />

      </ModalWrap>

      {BackDropComponent}
    </Stack >

  );

}
export default AddPointModal