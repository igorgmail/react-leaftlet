// import React, { FC, useEffect, useState } from 'react';

import { useAppSelector } from '../../../../store';

function useGetAddressService() {

  const centerFromStore = useAppSelector((store) => store.carsSettings.config.mapCenter)

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
      // const { display_name } = responseData
      if (responseData) {
        return responseData
      } else {
        return 'Не удалось получить Адрес'
      }
    } catch (err: any) {
      console.log('Произошла неизвестная ошибка', err);
      return 'Произошла неизвестная ошибка'
    };
  }

  return { getAddress }
}

export default useGetAddressService