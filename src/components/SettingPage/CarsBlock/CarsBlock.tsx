import React, { useState, useEffect, FC } from "react"

import { Container, Stack, Box, Typography, Grid } from "@mui/material"

import { useAppDispatch, useAppSelector, carsSettingsActions } from "../../../store";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import useCheckWhereIsClick from "./hooks/useCheckWhereIsClick";

import BlockHeader from "../components/BlockHeader";
import CarsSmallScreen from "./CarsSmallScreen";
import CarsLargeScreen from "./CarsLargeScreen";
import AddCarModal from "./AddCarModal/AddCarModal";

import { ICarObject } from "../types/carsSettingsTypes";


const CarsBlock = () => {
  console.log("--Render CarsBlock");

  const checkWhereClick = useCheckWhereIsClick()

  const carsData = useAppSelector((store) => store.carsSettings.cars)
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const chooseInput = useAppSelector((store) => store.carsSettings.config.chooseInputName)
  const objectWasModified = useAppSelector((store) => store.carsSettings.config.currentSelectBlock)

  const dispatch = useAppDispatch()

  useEffect(() => {

    function handleClickOutside(event: MouseEvent) {
      // const watchClick = checkWhereClick(event)

      // if (chooseInput === null) return

      // console.log("▶ ⇛ watchClick:", watchClick);
      // // dispatch(carsSettingsActions.setChooseInputName(null))
      // if (!watchClick) return

      // switch (watchClick) {
      //   case 'same':
      //     return

      //   case 'similar':

      //     const touchNumber = event.detail
      //     console.log("▶ ⇛⇛USE touchNumber:", touchNumber);
      //     // получаем значение атрибута data-forstore
      //     const target = event.target as HTMLElement
      //     const attrValue = target.dataset?.forstore
      //     if (touchNumber === 2) dispatch(carsSettingsActions.setChooseInputName(attrValue!))

      //     break

      // // case 'another':
      // //   dispatch(carsSettingsActions.setChooseInputName(null))
      // //   break

      //   // default:
      //   //   dispatch(carsSettingsActions.setChooseInputName(null))
      // }
      return
    }


    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [chooseInput, dispatch]);


  return (
    <Stack sx={{ whidth: '100%' }}>

      <BlockHeader header={'Автомобили'} />

      {!isSmallScreen ? (

        <CarsLargeScreen carsData={carsData} />

      ) : (

        <CarsSmallScreen carsData={carsData} />

      )}


      <AddCarModal />
    </Stack>
  )
}
export default CarsBlock




