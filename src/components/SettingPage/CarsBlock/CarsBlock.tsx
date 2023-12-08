import React, { useState, useEffect, FC } from "react"

import { Container, Stack, Box, Typography, Grid } from "@mui/material"

import { useAppDispatch, useAppSelector, carsSettingsActions } from "../../../store";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import BlockHeader from "../components/BlockHeader";
import CarsSmallScreen from "./CarsSmallScreen";
import CarsLadgeScreen from "./CarsLadgeScreen";
import AddCarModal from "./AddCarModal";

import { ICarObject } from "../types/carsSettingsTypes";


const CarsBlock = () => {
  console.log("--Render CarsBlock");

  const carsData = useAppSelector((store) => store.carsSettings.cars)
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const chooseInput = useAppSelector((store) => store.carsSettings.config.chooseInputName)
  console.log("▶ ⇛ chooseInput: IN UP", chooseInput);

  const dispatch = useAppDispatch()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      event.stopPropagation()

      const target = event.target as HTMLElement;
      const attrName = target.getAttribute('name')

      if (attrName !== chooseInput) dispatch(carsSettingsActions.setChooseInputName(null))

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
        <CarsLadgeScreen carsData={carsData} />
      ) : (
        <CarsSmallScreen carsData={carsData} />
      )}
      <AddCarModal />
    </Stack>
  )
}
export default CarsBlock




