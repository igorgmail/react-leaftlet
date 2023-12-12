import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../store';
import { Box, Input, Skeleton } from '@mui/material';


const AddressBlock = () => {

  const [addressValue, setAddressValue] = React.useState<string>('')
  const dispatch = useAppDispatch()

  const centerFromStore = useAppSelector((store) => store.carsSettings.config.mapCenter)
  const isMapMove = useAppSelector((store) => store.carsSettings.config.mapMove)
  console.log("▶ ⇛ isMapMove:", isMapMove);


  const getAddress = async () => {
    const abortController = new AbortController();
    const url = 'https://nominatim.openstreetmap.org/reverse?'
    const lang = 'ru'

    try {
      const response = await fetch(
        `${url}lat=${centerFromStore?.lat}&lon=${centerFromStore?.lng}&format=jsonv2&accept-language=${lang}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'same-origin',
        signal: abortController?.signal
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      let responseData = await response.json();
      const { display_name } = responseData
      if (display_name) {
        return display_name
      } else {
        return 'Не удалось получить Адрес'
      }
    } catch (err: any) {
      console.log('Произошла неизвестная ошибка', err);
      return 'Произошла неизвестная ошибка'
    };
  }


  useEffect(() => {
    console.log("isMapMove");
    if (isMapMove === false) {
      getAddress().then(data => setAddressValue(data))
    }
    if (isMapMove) {
      setAddressValue('')
    }
  }, [isMapMove])


  return (
    addressValue ? (
      <Input
        value={addressValue}
        readOnly
        sx={{
          marginBottom: '1rem',
          width: '80%'
        }} />)
      :
      (
        <Box sx={{ width: '100%', height: '2rem' }}>

          <Skeleton animation="wave" sx={{ height: '100%' }} />
        </Box>)



  )
}

export default AddressBlock