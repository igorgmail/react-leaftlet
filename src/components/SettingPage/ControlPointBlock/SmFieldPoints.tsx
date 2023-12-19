import React, { useState, useEffect, FC } from "react"

import { Stack, Box, Grid, Divider, Typography } from "@mui/material"


import { TEventForDialog, TEventFromDialog, TRemoveDialogCallback } from "../types/carsSettingsTypes";



import { TPointsData } from "../types/carsSettingsTypes";
import { useAppSelector, useAppDispatch, carsSettingsActions } from "../../../store";
import RemoveDialog from "../components/RemoveDialog";
import useBackDrop from "../hooks/useBackdrop";
import useRemoveDialog from "../hooks/useRemoveDialog";



interface ISmFieldPointsProps {
  onePoint: TPointsData
}


const SmFieldPoints: FC<ISmFieldPointsProps> = ({ onePoint }) => {

  const chooseInputFromStore = useAppSelector((store) => store.carsSettings.config.chooseInputName)

  const { startBackDrop, stopBackDrop, BackDropComponent } = useBackDrop();
  const { sendRemove } = useRemoveDialog()

  const [pointName, setPointName] = useState(onePoint.name)
  const [pointAddress, setPointAddress] = useState(onePoint.address)
  const [pointRadius, setPointRadius] = useState(onePoint.radius)

  const dispatch = useAppDispatch()
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

        }
      }).catch((err) => {
        console.warn("ERROR, Ошибка приудалении Точки", err);
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
    <>
    <Grid
      container alignItems="center" justifyContent="center"
      sx={{
        backgroundColor: 'white',
        marginTop: '2rem',
        borderRadius: '10px'
      }}>

      {/* Block - 1 */}
      <Grid item xs={6}>
        <Stack sx={{
          backgroundColor: '#078c75',
          color: 'white',
          borderTopLeftRadius: '10px',
        }}>

          <Typography align="center">Имя</Typography>
        </Stack>

      </Grid>

      <Grid item xs={6}>
        <Stack sx={{ backgroundColor: '#078c75', color: 'white', borderTopRightRadius: '10px', }}>
          <Typography align="center">Радиус</Typography>
        </Stack>

      </Grid>

      {/* Name */}
      <Grid item xs={6}>
        <Stack display={'flex'} flexDirection={'row'} justifyContent={'flex-start'}>

          <RemoveDialog callback={handleDialog}
            eventData={makeEventData(onePoint)} />

          <input
            // onTouchStart={handleTouchCarNameInput}
            // onMouseDown={handleInputClick}
            onClick={handleInputClick}
            // onMouseLeave={handleMouseLeave}
            // onDoubleClick={() => handleInputDoubleClick()}
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

      {/* Radius */}
      <Grid item xs={6}>
        <Stack display={'flex'} alignItems={'center'} justifyContent={'center'}>
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
        </Stack>
      </Grid>

      {/* Block - 2 */}
      <Grid item xs={12}>
        <Stack sx={{ backgroundColor: '#078c75', color: 'white' }}>
          <Typography align="center">Адрес</Typography>
        </Stack>
      </Grid>

      {/* Address */}
      <Grid item xs={12}>
        <Stack display={'flex'} justifyContent={'center'} alignItems={'center'}
          sx={{ padding: '8px' }}
        >

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

        </Stack>
      </Grid>

      {/* End Block */}
      <Grid item xs={12}>
        <Stack sx={{
          backgroundColor: '#bfbfbf',
          color: 'white',
          borderBottomRightRadius: '10px',
          borderBottomLeftRadius: '10px',
          height: '1.5rem',

        }}>
        </Stack>

      </Grid>
    </Grid>
      {BackDropComponent}
    </>
  )
}
export default SmFieldPoints