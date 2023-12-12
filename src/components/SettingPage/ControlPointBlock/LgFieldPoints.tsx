import React, { useState, useEffect, FC } from "react"

import { Stack, Box, Grid, Divider } from "@mui/material"


import { TRemoveDialogCallback } from "../types/carsSettingsTypes";



import { TPointsData } from "../types/carsSettingsTypes";
import { useAppSelector, useAppDispatch, carsSettingsActions } from "../../../store";
import RemoveDialog from "../components/RemoveDialog";



interface ILgFieldPointsProps {
  onePoint: TPointsData
}


const LgFieldPoints: FC<ILgFieldPointsProps> = ({ onePoint }) => {

  const chooseInputFromStore = useAppSelector((store) => store.carsSettings.config.chooseInputName)

  const [pointName, setPointName] = useState(onePoint.name)
  const [pointAddress, setPointAddress] = useState(onePoint.address)
  const [pointRadius, setPointRadius] = useState(onePoint.radius)

  const dispatch = useAppDispatch()

  const handleDialog = (eventData: TRemoveDialogCallback) => {
    console.log("▶ ⇛ eventData:", eventData);
  }

  const makeEventData = (point: TPointsData) => {

    const eventData = {
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
      targ.focus()

      // TODO Здесь нужна проверка на то что сейчас в сторе
      if (targ.dataset.forstore) dispatch(carsSettingsActions.setChooseInputName(targ.dataset.forstore))

      // Установка курсора в конец текста
      // targ.type = 'text'
      const textLength = targ.value.length;
      targ.setSelectionRange(textLength, textLength);
      // targ.type = 'number'
    }
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
            className={chooseInputFromStore === `id${onePoint.point_id}-pointName` ? "all-white-input--choose-style" : "all-white-input-style"}
            readOnly={chooseInputFromStore !== `id${onePoint.point_id}-pointName`}
            style={{
              width: `calc(${onePoint.name.length}ch + 30px)`,
            }}
            value={pointName}
            data-forstore={`id${onePoint.point_id}-pointName`}
            data-interactive
          />
        </Stack>
      </Grid>

      {/* Address */}
      <Grid item xs={7} display={'flex'} justifyContent={'center'}>
        <Box margin={'auto'} display={'flex'} alignItems={'center'}>
          {pointAddress?.length &&
            <input
              onClick={handleInputClick}
              onChange={(e) => setPointAddress(e.target.value)}
              className={chooseInputFromStore === `id${onePoint.point_id}-pointAddress` ? "all-white-input--choose-style" : "all-white-input-style"}
              style={{ width: `100%`, fontSize: '0.8rem' }}
              type="text"
              readOnly={chooseInputFromStore !== `id${onePoint.address}-pointAddress`}
              value={pointAddress}
              data-forstore={`id${onePoint.point_id}-pointAddress`}
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
          className={chooseInputFromStore === `id${onePoint.point_id}-pointRadius` ? "all-white-input--choose-style" : "all-white-input-style"}
          style={{ width: `calc(${onePoint.radius.length}ch + 22px)`, fontSize: '0.8rem' }}
          type="text"
          readOnly={true}
          value={pointRadius}
          data-forstore={`id${onePoint.point_id}-pointRadius`}
          data-interactive
        />
        {/* </Stack> */}
      </Grid>

      <Divider />
    </Grid>
  )
}
export default LgFieldPoints