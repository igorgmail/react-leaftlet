import { Divider, Grid, Stack, Typography } from "@mui/material"
import { ICarObject, TRemoveDialogCallback } from "../types/carsSettingsTypes";
import { FC, ReactElement, ReactEventHandler, useEffect, useRef, useState } from "react";
import { makeEventData } from "./utils/makeEventData";
import RemoveDialog from "../components/RemoveDialog";
import { useAppDispatch, useAppSelector, carsSettingsActions } from "../../../store";
import IconsCarsMenu from "./CarsIconMenu/IconsCarsMenu";




interface ISmallCarsProps {
  car: ICarObject
}


const SmallCarsField: FC<ISmallCarsProps> = ({ car }) => {
  console.log("--Render SmallField");


  const iconsCars = useAppSelector((store) => store.carsSettings.icons)
  const chooseInputFromStore = useAppSelector((store) => store.carsSettings.config.chooseInputName)


  const [inputCarNameValue, setInputCarNameValue] = useState(car.name);
  const [inputCarImeiValue, setInputCarImeiValue] = useState(car.imei);
  const [inputCarAlterImeiValue, setInputCarAlterImeiValue] = useState(car.alter_imei);
  const [inputCarIconIdValue, setInputCarIconIdValue] = useState<string>(car.pic);


  const handleDialog = (eventData: TRemoveDialogCallback) => {
    console.log("▶ ⇛ eventData:", eventData);

  }

  const handleIconCarInNetClick = (e: React.MouseEvent, popupState: any) => {
    const target = e.currentTarget as HTMLImageElement;
    if (target.dataset.iconid) {
      const chooseIconUrl = iconsCars.find((obj) => obj.icon_id === String(target.dataset.iconid))
      setInputCarIconIdValue(chooseIconUrl?.url || '')
    }
    popupState.close()
  }

  const handleTouchCarNameInput = (event: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
    const targ = event.currentTarget
    targ.focus()

    dispatch(carsSettingsActions.setChooseInputName(event.currentTarget.name))
    // Установка курсора в конец текста
    // targ.type = 'text'
    const textLength = targ.value.length;
    targ.setSelectionRange(textLength, textLength);

  }



  return (
    <Grid
      container alignItems="center" justifyContent="center"
      sx={{
        backgroundColor: 'white',
        marginTop: '2rem',
        borderRadius: '10px'
      }}
      data-carid={car.car_id}
    >

      {/* Block - 1 Name and Icon */}
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
          <Typography align="center">Иконка</Typography>
        </Stack>

      </Grid>

      {/* Name */}
      <Grid item xs={6}>
        <Stack display={'flex'} flexDirection={'row'} justifyContent={'flex-start'}>

          <RemoveDialog callback={handleDialog}
            eventData={makeEventData(car)} />

          <input
            // onClick={() => { }}   // onTouchStart={handleTouchCarNameInput}
            onMouseDown={handleTouchCarNameInput}
            className={chooseInputFromStore === `id${car.car_id}-carName` ? "all-white-input--choose-style" : "all-white-input-style"}
            style={{
              width: `calc(${car.name.length}ch + 22px)`,
            }}
            type="text"
            readOnly={true}
            onChange={(e) => setInputCarNameValue(e.target.value)}
            value={inputCarNameValue}
            name={`id${car.car_id}-carName`}
          />
        </Stack>
      </Grid>

      {/* Icon */}
      <Grid item xs={6}>
        <Stack display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <IconsCarsMenu
            handleIconCarInNetClick={handleIconCarInNetClick}>
            <img
              src={inputCarIconIdValue}
              className="carblock-icon-cars"
              style={{ transform: 'rotate(90deg)', width: '2rem' }}
              alt="Иконка"></img>
          </IconsCarsMenu>
        </Stack>
      </Grid>

      {/* Block - 2 Imei and Alter-Imei*/}
      <Grid item xs={6}>
        <Stack sx={{ backgroundColor: '#078c75', color: 'white' }}>
          <Typography align="center">Imei</Typography>
        </Stack>
      </Grid>

      <Grid item xs={6}>
        <Stack sx={{ backgroundColor: '#078c75', color: 'white' }}>
          <Typography align="center">Imei 2</Typography>

        </Stack>
      </Grid>

      {/* Imei */}
      <Grid item xs={6}>
        <Stack display={'flex'} justifyContent={'center'} alignItems={'center'}
          sx={{ padding: '8px' }}
        >
          <input
            onClick={() => { }} // По одиночному клику
            onChange={(e) => setInputCarImeiValue(e.target.value)}
            className={chooseInputFromStore === `id${car.car_id}-carImei` ? "all-white-input--choose-style" : "all-white-input-style"}
            style={{ width: `calc(${car.imei.length}ch + 22px)` }}
            type="text"
            readOnly={chooseInputFromStore !== `id${car.car_id}-carImei`}
            value={inputCarImeiValue}
            name={`id${car.car_id}-carImei`}
          />
        </Stack>
      </Grid>

      {/* Imei-2 */}
      <Grid item xs={6}>
        <Stack display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <input
            onClick={() => { }}
            onChange={(e) => setInputCarAlterImeiValue(e.target.value)}
            className={chooseInputFromStore === `id${car.car_id}-carImei-2` ? "all-white-input--choose-style" : "all-white-input-style"}
            style={{ width: `calc(${car.alter_imei?.length || 0}ch + 22px)` }}
            type="text"
            readOnly={chooseInputFromStore !== `id${car.car_id}-carImei-2`}
            value={inputCarAlterImeiValue || ''}
            name={`id${car.car_id}-carImei-2`}
          />
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
  )
}
export default SmallCarsField

function dispatch(arg0: { payload: string | null; type: "carsSettings/setChooseInputName"; }) {
  throw new Error("Function not implemented.");
}
