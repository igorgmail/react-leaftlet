import React, { useState, useEffect, FC } from "react"

import { Stack, Box, Grid, Divider } from "@mui/material"


import { TEventForDialog, TEventFromDialog, TRemoveDialogCallback } from "../types/carsSettingsTypes";
import useRemoveDialog from "../hooks/useRemoveDialog";


import { TPointsData } from "../types/carsSettingsTypes";
import { useAppSelector, useAppDispatch, carsSettingsActions } from "../../../store";
import RemoveDialog from "../components/RemoveDialog";
import useBackDrop from "../hooks/useBackdrop";



interface ILgFieldPointsProps {
  onePoint: TPointsData
}


const LgFieldPoints: FC<ILgFieldPointsProps> = ({ onePoint }) => {
  console.log("--Render lgFieldPoint");

  const chooseInputFromStore = useAppSelector((store) => store.carsSettings.config.chooseInputName)

  const [pointName, setPointName] = useState(onePoint.name)
  const [pointAddress, setPointAddress] = useState(onePoint.address)
  const [pointRadius, setPointRadius] = useState(onePoint.radius)

  const { startBackDrop, stopBackDrop, BackDropComponent } = useBackDrop();
  const { sendRemove } = useRemoveDialog()
  const dispatch = useAppDispatch()


  const handleDialog = (eventData: TEventFromDialog) => {
    startBackDrop()
    sendRemove(eventData)
      .then((data) => {
        if (data.data) {
          const id = data.data.data
          dispatch(carsSettingsActions.setRemovePoint(id))
          stopBackDrop()
        } else {
          console.info("При удалении Точки с сервера пришли некорректные данные");

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
    address: `id${onePoint.address}-pointAddress`,
    radius: `id${onePoint.point_id}-pointRadius`,
  }

  return (
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
            onClick={handleInputClick}
            onChange={(e) => setPointName(e.target.value)}
            className={chooseInputFromStore === POINT_KEY.name ? "all-white-input--choose-style" : "all-white-input-style"}
            readOnly={chooseInputFromStore !== POINT_KEY.name}
            style={{
              width: `calc(${onePoint.name.length}ch + 30px)`,
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
              onClick={handleInputClick}
              onChange={(e) => setPointAddress(e.target.value)}
            className={chooseInputFromStore === POINT_KEY.address ? "all-white-input--choose-style" : "all-white-input-style"}
              style={{ width: `100%`, fontSize: '0.8rem' }}
              type="text"
            readOnly={chooseInputFromStore !== POINT_KEY.address}
              value={pointAddress}
            data-forstore={POINT_KEY.address}
              data-interactive
            />
          }

        </Box>
      </Grid>

      {/* Radius */}
      <Grid item xs={2} display={'flex'} justifyContent={'center'}>
        {/* <Stack display={'flex'} alignItems={'center'}> */}
        <input
          onClick={handleInputClick}
          onChange={(e) => setPointRadius(e.target.value)}
          className={chooseInputFromStore === POINT_KEY.radius ? "all-white-input--choose-style" : "all-white-input-style"}
          style={{ width: `calc(${onePoint.radius.length}ch + 22px)`, fontSize: '0.8rem' }}
          type="number"
          readOnly={chooseInputFromStore !== POINT_KEY.radius}
          value={pointRadius}
          data-forstore={POINT_KEY.radius}
          data-interactive
        />
        {/* </Stack> */}
      </Grid>

      <Divider />
      {BackDropComponent}

    </Grid>
  )
}
export default LgFieldPoints