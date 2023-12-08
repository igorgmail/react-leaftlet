import { Divider, Grid, Stack } from "@mui/material"
import { ICarObject, TRemoveDialogCallback } from "../types/carsSettingsTypes";
import { FC, ReactElement, ReactEventHandler, useEffect, useRef, useState } from "react";
import { makeEventData } from "./utils/makeEventData";
import RemoveDialog from "../components/RemoveDialog";
import { useAppDispatch, useAppSelector, carsSettingsActions } from "../../../store";


interface ICarsFieldProps {
  car: ICarObject,
}

const LadgeCarsField: FC<ICarsFieldProps> = ({ car }) => {
  console.log("--Render CarsField Ladge");

  const [inputCarNameValue, setInputCarNameValue] = useState(car.name);
  const [inputCarImeiValue, setInputCarImeiValue] = useState(car.imei);
  const [inputCarAlterImeiValue, setInputCarAlterImeiValue] = useState(car.alter_imei);

  const [inputReadOnly, setInputReadOnly] = useState(true)

  // const [chooseInput, setChooseInput] = useState<string | null>(null)

  const inputRef = useRef(null);

  const chooseInputFromStore = useAppSelector((store) => store.carsSettings.config.chooseInputName)
  const dispatch = useAppDispatch()

  const handleDialog = (eventData: TRemoveDialogCallback) => {
    console.log("▶ ⇛ eventData:", eventData);
  }

  const handleCarNameInput = (event: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
    event.preventDefault()
    const touchNumber = event.detail

    if (touchNumber === 2) {
      // setInputReadOnly(false)
      // setChooseInput(event.currentTarget.name)
      const targ = event.currentTarget
      targ.focus()

      dispatch(carsSettingsActions.setChooseInputName(event.currentTarget.name))
      // Установка курсора в конец текста
      const textLength = targ.value.length;
      targ.setSelectionRange(textLength, textLength);
    }
  }

  const handleTouchCarNameInput = () => {
    console.log("TOUCCH");

  }



  return (

    <Grid container
      sx={{
        backgroundColor: 'white',
        paddingLeft: '.8rem'
      }}
      data-carid={car.car_id}
    >

      {/* Name */}
      <Grid item xs={3} md={3} display={'flex'} justifyContent={'flex-start'}>
        <Stack display={'flex'} flexDirection={'row'} alignItems={'center'} >

          <RemoveDialog callback={handleDialog} eventData={makeEventData(car)} />

          <input
            onClick={handleCarNameInput}
            onTouchStart={handleCarNameInput}
            className={chooseInputFromStore === `id${car.car_id}-carName` ? "all-white-input--choose-style" : "all-white-input-style"}
            style={{
              width: `calc(${car.name.length}ch + 22px)`,
            }}
            readOnly={chooseInputFromStore !== `id${car.car_id}-carName`}
            onChange={(e) => setInputCarNameValue(e.target.value)}
            value={inputCarNameValue}
            name={`id${car.car_id}-carName`}
          />
        </Stack>
      </Grid>

      {/* Icon */}
      <Grid item xs={2} md={3} display={'flex'} justifyContent={'center'}>
        <Stack margin={'auto'} display={'flex'} alignItems={'center'}>

          <img src={car.pic}
            className="carblock-icon-cars"
            style={{
              transform: 'rotate(90deg)', width: '2rem'
            }}
            alt="Иконка"></img>

        </Stack>
      </Grid>

      {/* Imei */}
      <Grid item xs={3} md={3} display={'flex'} alignItems={'center'}>
        <Stack>
          <input
            onClick={handleCarNameInput}
            className={chooseInputFromStore === `id${car.car_id}-carImei` ? "all-white-input--choose-style" : "all-white-input-style"}
            style={{
              width: `calc(${car.imei.length}ch + 22px)`, fontSize: '0.8rem'
            }}
            type="text"
            readOnly={chooseInputFromStore !== `id${car.car_id}-carImei`}
            value={inputCarImeiValue}
            name={`id${car.car_id}-carImei`}
          />
        </Stack>
      </Grid>

      {/* Imei-2 */}
      <Grid item xs={4} md={3} display={'flex'} alignItems={'center'}>
        <Stack >
          <input
            onClick={handleCarNameInput}
            className={chooseInputFromStore === `id${car.car_id}-carImei-2` ? "all-white-input--choose-style" : "all-white-input-style"}
            style={{
              width: `calc(${car.alter_imei?.length || 0}ch + 22px)`, fontSize: '0.8rem'
            }}
            type="text"
            readOnly={chooseInputFromStore !== `id${car.car_id}-carImei-2`}
            value={inputCarAlterImeiValue || ''}
            name={`id${car.car_id}-carImei-2`}
          />
        </Stack>
      </Grid>
      <Divider />
    </Grid>
  )
}




export default LadgeCarsField