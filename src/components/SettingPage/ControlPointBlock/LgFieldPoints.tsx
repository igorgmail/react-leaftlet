import React, { useState, useEffect, FC } from "react"

import { Stack, Box, Grid, Divider } from "@mui/material"


import { TEventForDialog, TEventFromDialog } from "../types/carsSettingsTypes";
import useRemoveDialog from "../hooks/useRemoveDialog";


import { TPointsData, TSelectedFieldChanged } from "../types/carsSettingsTypes";
import { useAppSelector, useAppDispatch, carsSettingsActions, store } from "../../../store";
import RemoveDialog from "../components/RemoveDialog";
import useBackDrop from "../hooks/useBackdrop";
import useGetAddressService from "./hooks/useGetAddressService";
import { LatLng } from "leaflet";
import useAlert from "../hooks/useAlert";
import useStartUpdate from "../hooks/useStartUpdate";
import configAdminPage from "../config";



interface ILgFieldPointsProps {
  onePoint: TPointsData
}
// type TSelectedFieldChanged = {
//   typeField: 'cars' | 'points' | 'events' | 'users',
//   selectBlockObject: ICarObject | TPointsDataWithAddress | TEventsData | TUsers
// }

const LgFieldPoints: FC<ILgFieldPointsProps> = ({ onePoint }) => {
  console.log("--Render lgFieldPoint");

  const { showAlert, alertComponent } = useAlert();
  const chooseInputFromStore = useAppSelector((store) => store.carsSettings.config.chooseInputName)

  const [pointId, setPointId] = useState(onePoint.point_id)
  const [pointName, setPointName] = useState(onePoint.name)
  const [pointAddress, setPointAddress] = useState(onePoint.address)
  const [pointRadius, setPointRadius] = useState(onePoint.radius)

  const [pointLat, setPointLat] = useState(onePoint.lat)
  const [pointLng, setPointLng] = useState(onePoint.lng)

  const { startBackDrop, stopBackDrop, BackDropComponent } = useBackDrop();
  const { sendRemove } = useRemoveDialog()
  const dispatch = useAppDispatch()
  const { getAddress } = useGetAddressService()

  const { startUpdate } = useStartUpdate()

  const handleDialog = (eventData: TEventFromDialog) => {
    startBackDrop()
    sendRemove(eventData)
      .then((data) => {
        if (data?.data) {
          const id = data.data
          dispatch(carsSettingsActions.setRemovePoint(id))
          stopBackDrop()
        } else {
          console.info("При удалении Точки с сервера пришли некорректные данные");
          showAlert('Не удалось удалить точку', 'error')
        }
      }).catch((err) => {
        console.warn("ERROR, Ошибка при удалении Точки", err);
      }).finally(() => stopBackDrop())
  }

  const makeEventData = (point: TPointsData) => {
    const eventData: TEventForDialog = {
      event: 'REMOVE_POINT',
      subjectid: point.point_id,
      msg: `Будет удалена контрольная точка <br>${point.name}`
    }

    return eventData
  }



  const handleInputClick = (event: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
    event.preventDefault()
    const touchNumber = event.detail

    if (touchNumber === 2) {
      const targ = event.currentTarget
      const dataValue = targ.dataset.forstore
      const inputType = event.currentTarget.type
      targ.focus()

      // ! Этот вариант
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

  const POINT_KEY = {
    name: `id${onePoint.point_id}-pointName`,
    address: `id${onePoint.point_id}-pointAddress`,
    radius: `id${onePoint.point_id}-pointRadius`,
  }

  type WithDisplayName<T extends { display_name?: string }> = T;
  const extractFullAddress = <T extends { display_name?: string }>(data: WithDisplayName<T>): string | undefined => {
    return data.display_name;
  };

  const pointObject: TSelectedFieldChanged = {
    typeField: 'points',
    selectBlockObject: {
      point_id: String(onePoint.point_id),
      name: pointName,
      lat: pointLat,
      lng: pointLng,
      address: pointAddress || '',
      radius: pointRadius
    }
  }

  const handleFieldChange = (event: React.SyntheticEvent) => {
    if (event.target instanceof HTMLInputElement) {

      const itemName = (event.target as HTMLInputElement).getAttribute('name')
      if (itemName === 'point_name') {
        setPointName(event.target.value)
        dispatch(carsSettingsActions.setCurrentSelectBlock({ ...pointObject, selectBlockObject: { ...pointObject.selectBlockObject, name: event.target.value } }))
      }
      if (itemName === 'point_address') {
          setPointAddress(event.target.value)
          dispatch(carsSettingsActions.setCurrentSelectBlock({ ...pointObject, selectBlockObject: { ...pointObject.selectBlockObject, address: event.target.value } }))
      }
      if (itemName === 'point_radius') {
        if (!/^\d*$/.test(event.target.value)) return
        if (Number(event.target.value) >= 0 && Number(event.target.value) <= 1000) {
          setPointRadius(event.target.value)
          dispatch(carsSettingsActions.setCurrentSelectBlock({ ...pointObject, selectBlockObject: { ...pointObject.selectBlockObject, radius: event.target.value } }))
        }
      }

    }
  }

  // function startUpdate() {
  //   console.log("▶ ⇛ IN startUpdate:");

  //   // startBackDrop()
  //   updateDataRequest().then((data) => {
  //     console.log("▶ ⇛ updateDataRequestdata:", data);

  //   }).catch((err) => {
  //     console.warn("При обновлении произошла ошибка ", err);

  //     showAlert('Ошибка при обновлении', 'error')
  //     setUpdateForm((cur) => !cur)
  //   })
  // }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Проверяем, была ли нажата клавиша "Enter"
    const key = e.key || e.keyCode || e.which;
    const target = e.target as HTMLInputElement
    if (key === 'Enter' || key === 13) {
      const isModifiedData = store.getState().carsSettings.config.currentSelectBlock
      if (isModifiedData) {
        dispatch(carsSettingsActions.setChooseInputName(null))
        startUpdate()
      } else {
        dispatch(carsSettingsActions.setChooseInputName(null))
      }
      target.blur()
    }
  };

  useEffect(() => {
    const coordinates = new LatLng(Number(onePoint.lat), Number(onePoint.lng))

    if (!onePoint.address) {
    getAddress(coordinates)
      .then((data) => extractFullAddress(data))
      .then(data => {
        // if()
        setPointAddress(data)
      })
    } else {
      setPointAddress(onePoint.address)
    }
  }, [onePoint])

  useEffect(() => {
    setPointId(onePoint.point_id)
    setPointName(onePoint.name)
    setPointAddress(onePoint.address)
    setPointRadius(onePoint.radius)
    setPointLat(onePoint.lat)
    setPointLng(onePoint.lng)
  }, [onePoint])

  return (
    <>

    <Grid
      container
      sx={{
        backgroundColor: 'white',
        paddingLeft: '.8rem'
      }}
    >
      {/* Name */}
      <Grid item xs={3} display={'flex'} justifyContent={'flex-start'}>
        <Stack display={'flex'} flexDirection={'row'} alignItems={'center'} >

          {/* Remove Button */}
          <RemoveDialog callback={handleDialog}
            eventData={makeEventData(onePoint)}
          />

          <input
              name={'point_name'}
            onClick={handleInputClick}
              onChange={handleFieldChange}
              onKeyDown={handleKeyDown}
            className={chooseInputFromStore === POINT_KEY.name ? "all-white-input--choose-style" : "all-white-input-style"}
            readOnly={chooseInputFromStore !== POINT_KEY.name}
            style={{
              width: `100%`,
              textAlign: 'left',
              // width: `calc(${onePoint.name.length}ch + 30px)`,
            }}
            value={pointName}
            data-forstore={POINT_KEY.name}
            data-interactive
          />
        </Stack>
      </Grid>

      {/* Address */}
      <Grid item xs={7} display={'flex'} justifyContent={'center'}>
        <Box margin={'auto'} display={'flex'} alignItems={'center'} width={'100%'}>
          {pointAddress?.length &&
            <input
              name={'point_address'}
              onClick={handleInputClick}
              onChange={handleFieldChange}
              onKeyDown={handleKeyDown}
            className={chooseInputFromStore === POINT_KEY.address ? "all-white-input--choose-style" : "all-white-input-style"}
              style={{ width: `100%`, fontSize: '0.8rem' }}
              type="text"
            readOnly={chooseInputFromStore !== POINT_KEY.address}
              value={pointAddress}
            data-forstore={POINT_KEY.address}
              data-interactive
              autoComplete="off"
            />
          }

        </Box>
      </Grid>

      {/* Radius */}
      <Grid item xs={2} display={'flex'} justifyContent={'center'}>
        {/* <Stack display={'flex'} alignItems={'center'}> */}
        <input
            name={'point_radius'}
          onClick={handleInputClick}
            onChange={handleFieldChange}
            onKeyDown={handleKeyDown}
          className={chooseInputFromStore === POINT_KEY.radius ? "all-white-input--choose-style" : "all-white-input-style"}
            style={{
              width: `100%`,
              textAlign: 'center',
              // width: `calc(${onePoint.radius.length}ch + 22px)`, 
              fontSize: '0.8rem'
            }}
            type="text" inputMode="numeric" pattern="\d*" 
          readOnly={chooseInputFromStore !== POINT_KEY.radius}
          value={pointRadius}
          data-forstore={POINT_KEY.radius}
          data-interactive
            autoComplete="off"
        />
        {/* </Stack> */}
      </Grid>

        <Divider />

    </Grid>
      {BackDropComponent}
      {alertComponent}
    </>
  )
}
export default LgFieldPoints