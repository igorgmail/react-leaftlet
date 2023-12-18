import { Grid, Stack, Typography } from "@mui/material"
import { ICarObject, TEventForDialog, TEventFromDialog, TRemoveDialogCallback } from "../types/carsSettingsTypes";
import { FC, useEffect, useState } from "react";

import RemoveDialog from "../components/RemoveDialog";
import { useAppDispatch, useAppSelector, carsSettingsActions } from "../../../store";
// import IconsCarsMenu from "./CarsIconMenu/IconsCarsMenu";
import ModalWithIconsCars from "./CarsIconMenu/AddModalWithIconsCars";


import useRemoveDialog from "../hooks/useRemoveDialog";
import useBackDrop from "../hooks/useBackdrop";

interface ISmFieldCarsProps {
  car: ICarObject
}


const SmFieldCars: FC<ISmFieldCarsProps> = ({ car }) => {
  console.log("--Render SmallField");

  const iconsCars = useAppSelector((store) => store.carsSettings.icons)
  const chooseInputFromStore = useAppSelector((store) => store.carsSettings.config.chooseInputName)

  const [carIdValue, setCarIdValue] = useState(car.car_id);
  const [inputCarNameValue, setInputCarNameValue] = useState(car.name);
  const [inputCarImeiValue, setInputCarImeiValue] = useState(car.imei);
  const [inputCarAlterImeiValue, setInputCarAlterImeiValue] = useState(car.alter_imei);
  const [inputCarIconIdValue, setInputCarIconIdValue] = useState<string>(car.pic);
  const [modalOpen, setModalOpen] = useState(false);

  const { startBackDrop, stopBackDrop, BackDropComponent } = useBackDrop();
  const { sendRemove } = useRemoveDialog()
  const dispatch = useAppDispatch()

  const handleDialog = (eventData: TEventFromDialog) => {
    startBackDrop()
    sendRemove(eventData)
      .then((data) => {
        if (data.data) {
          const id = data.data.data
          dispatch(carsSettingsActions.setRemoveCar(id))
          stopBackDrop()
        } else {
          console.info("При удалении Авто с сервера пришли некорректные данные");

        }
      }).catch((err) => {
        console.warn("ERROR, Ошибка при удалении Авто", err);
      }).finally(() => stopBackDrop())
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

  const handleIconCarInNetClick = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLImageElement;
    if (target.dataset.iconid) {
      const chooseIconUrl = iconsCars.find((obj) => obj.icon_id === String(target.dataset.iconid))
      setInputCarIconIdValue(chooseIconUrl?.url || '')
    }
    setModalOpen(false)
  }

  const makeEventData = (car: ICarObject) => {
    const eventData: TEventForDialog = {
      event: 'REMOVE_CAR',
      subjectid: car.car_id,
      msg: `Будет удален Автомобиль <br>${car.name}`
    }

    return eventData
  }

  const CAR_KEY = {
    name: `id${car.car_id}-carName`,
    imei: `id${car.car_id}-carImei`,
    altImei: `id${car.car_id}-altCarImei`,
    pic: `id${car.car_id}-carPic`,
    parentPic: `id${car.car_id}-parentIcon`
  }

  useEffect(() => {
    console.log("Текущее состояние");
    console.log("inputCarNameValue-->", inputCarNameValue);
    console.log("inputCarImeiValue-->", inputCarImeiValue);
    console.log("inputCarAlterImeiValue-->", inputCarAlterImeiValue);
    console.log("inputCarIconIdValue-->", inputCarIconIdValue);

    const selectObject = {
      car_id: carIdValue,
      name: inputCarNameValue,
      pic: inputCarIconIdValue,
      imei: inputCarImeiValue,
      alter_imei: inputCarAlterImeiValue
    }
    dispatch(carsSettingsActions.setCurrentSelectBlock({ typeField: 'cars', selectBlockObject: selectObject }))

  }, [inputCarNameValue, inputCarImeiValue, inputCarAlterImeiValue, inputCarIconIdValue, dispatch])


  useEffect(() => {
    setInputCarNameValue(car.name)
    setInputCarImeiValue(car.imei)
    setInputCarAlterImeiValue(car.alter_imei)
    setInputCarIconIdValue(car.pic)

  }, [car])

  return (
    <>

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
              onClick={handleInputClick}
            className={chooseInputFromStore === CAR_KEY.name ? "all-white-input--choose-style" : "all-white-input-style"}
            style={{
              textAlign: 'center',
              width: `100%`,
              // width: `calc(${car.name.length}ch + 22px)`,
            }}
            type="text"
            readOnly={chooseInputFromStore !== CAR_KEY.name}
            onChange={(e) => setInputCarNameValue(e.target.value)}
            value={inputCarNameValue}
            data-forstore={CAR_KEY.name}
          />
        </Stack>
      </Grid>

      {/* Icon */}
      <Grid item xs={6}>
          <Stack display={'flex'} alignItems={'center'} justifyContent={'center'}
        >
          <ModalWithIconsCars
              handleIconCarInNetClick={handleIconCarInNetClick}
            iconParentId={car.car_id}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
          >
            <img
              src={inputCarIconIdValue}
              className="carblock-icon-cars"
              style={{ transform: 'rotate(90deg)', width: '2rem' }}
              alt="Иконка"
              data-forstore={CAR_KEY.parentPic}
              data-interactive
              data-interactive-image
            >
            </img>
          </ModalWithIconsCars>
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
            onClick={handleInputClick}
            onChange={(e) => setInputCarImeiValue(e.target.value)}
            className={chooseInputFromStore === CAR_KEY.imei ? "all-white-input--choose-style" : "all-white-input-style"}
              style={{
                textAlign: 'center',
                width: `100%`,
                // width: `calc(${car.imei.length}ch + 22px)` 
              }}
              type="number"
            readOnly={chooseInputFromStore !== CAR_KEY.imei}
            value={inputCarImeiValue}
            data-forstore={CAR_KEY.imei}
          />
        </Stack>
      </Grid>

      {/* Imei-2 */}
      <Grid item xs={6}>
        <Stack display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <input
            onClick={handleInputClick}
            onChange={(e) => setInputCarAlterImeiValue(e.target.value)}
            className={chooseInputFromStore === CAR_KEY.altImei ? "all-white-input--choose-style" : "all-white-input-style"}
              style={{
                textAlign: 'center',
                width: `100%`,
                // width: `calc(${car.alter_imei?.length || 0}ch + 22px)` 
              }}
              type="number"
            readOnly={chooseInputFromStore !== CAR_KEY.altImei}
            value={inputCarAlterImeiValue || ''}
            data-forstore={CAR_KEY.altImei}
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
      {BackDropComponent}
    </>
  )
}
export default SmFieldCars;
