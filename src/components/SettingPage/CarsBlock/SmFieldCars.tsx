import { Grid, Stack, Typography } from "@mui/material"
import { ICarObject, TEventForDialog, TEventFromDialog, TRemoveDialogCallback, TSelectedFieldChanged } from "../types/carsSettingsTypes";
import { FC, useEffect, useRef, useState } from "react";

import RemoveDialog from "../components/RemoveDialog";
import { useAppDispatch, useAppSelector, carsSettingsActions, store } from "../../../store";
// import IconsCarsMenu from "./CarsIconMenu/IconsCarsMenu";
import ModalWithIconsCars from "./CarsIconMenu/AddModalWithIconsCars";


import useRemoveDialog from "../hooks/useRemoveDialog";
import useBackDrop from "../hooks/useBackdrop";
import useAlert from "../hooks/useAlert";
import useUpdateData from "../hooks/useUpdateData";

interface ISmFieldCarsProps {
  car: ICarObject,
  setUpdateForm: React.Dispatch<React.SetStateAction<boolean>>
}


const SmFieldCars: FC<ISmFieldCarsProps> = ({ car, setUpdateForm }) => {
  console.log("--Render SmallField");

  const iconsCars = useAppSelector((store) => store.carsSettings.icons)
  const chooseInputFromStore = useAppSelector((store) => store.carsSettings.config.chooseInputName)

  // const [carIdValue, setCarIdValue] = useState(car.car_id);
  const [inputCarNameValue, setInputCarNameValue] = useState(car.name);
  const [inputCarImeiValue, setInputCarImeiValue] = useState(car.imei);
  const [inputCarAlterImeiValue, setInputCarAlterImeiValue] = useState(car.alter_imei);
  const [inputCarIconIdValue, setInputCarIconIdValue] = useState<string>(car.pic);
  const [modalOpen, setModalOpen] = useState(false);

  const [test, setTest] = useState<string | number>();

  const nameRef = useRef()
  const imeyRef = useRef()

  const { updateDataRequest } = useUpdateData()
  const { startBackDrop, stopBackDrop, BackDropComponent } = useBackDrop();
  const { showAlert, alertComponent } = useAlert()
  const { sendRemove } = useRemoveDialog()
  const dispatch = useAppDispatch()

  const handleDialog = (eventData: TEventFromDialog) => {
    startBackDrop()
    sendRemove(eventData)
      .then((data) => {
      if (data?.data) {
        const id = data.data
        dispatch(carsSettingsActions.setRemoveCar(id))
        stopBackDrop()
      } else {
        console.info("При удалении Авто с сервера пришли некорректные данные");
        showAlert('Не удалось удалить точку', 'error')
      }
    }).catch((err) => {
      console.warn("ERROR, Ошибка при удалении Авто", err);
    }).finally(() => stopBackDrop())
  }

  const handleInputClick = (event: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
    // event.preventDefault()
    const touchNumber = event.detail

    if (touchNumber === 1) {
      const targ = event.currentTarget
      console.log("▶ ⇛ targ:", targ);


      // targ.setAttribute('readonly', 'false')
      const dataValue = targ.dataset.forstore
      const inputType = event.currentTarget.type

      if (dataValue === chooseInputFromStore) return
      targ.blur()
      targ.removeAttribute('readonly');
      setTimeout(() => targ.focus())

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

  // const handleNumberValidate = (evt: React.KeyboardEvent<HTMLInputElement>) => {
  //   (evt.key === 'e'
  //     || evt.key === '-'
  //     || evt.key === '+')
  //     && evt.preventDefault()
  // }
  // const handleNumberValidateTouch = (evt: React.TouchEvent<HTMLInputElement>) => {
  //   console.log("▶ ⇛ evt:", evt);
  //   // (evt.touches === 'e'
  //   //   || evt.key === '-'
  //   //   || evt.key === '+')
  //   //   && evt.preventDefault()
  // }

  const handleIconCarInNetClick = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLImageElement;
    if (target.dataset.iconid) {
      const chooseIconUrl = iconsCars.find((obj) => obj.icon_id === String(target.dataset.iconid))
      setInputCarIconIdValue(chooseIconUrl?.url || '')
      dispatch(carsSettingsActions.setCurrentSelectBlock({ ...carObject, selectBlockObject: { ...carObject.selectBlockObject, pic: chooseIconUrl?.url || '' } }))
      startUpdate()
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

  const carObject: TSelectedFieldChanged = {
    typeField: 'cars',
    selectBlockObject: {
      car_id: String(car.car_id),
      name: inputCarNameValue,
      pic: inputCarIconIdValue,
      imei: inputCarImeiValue,
      alter_imei: inputCarAlterImeiValue
    }
  }
  const handleFieldChange = (event: React.SyntheticEvent) => {
    if (event.target instanceof HTMLInputElement) {

      const itemName = (event.target as HTMLInputElement).getAttribute('name')
      if (itemName === 'car_name') {
        setInputCarNameValue(event.target.value)
        dispatch(carsSettingsActions.setCurrentSelectBlock({ ...carObject, selectBlockObject: { ...carObject.selectBlockObject, name: event.target.value } }))
      }
      if (itemName === 'car_imei') {
        if (!/^\d+$/.test(event.target.value)) return
        if (event.target.value.length <= 15) {
          setInputCarImeiValue(event.target.value)
          dispatch(carsSettingsActions.setCurrentSelectBlock({ ...carObject, selectBlockObject: { ...carObject.selectBlockObject, imei: event.target.value } }))
        }
      }
      if (itemName === 'car_alterimei') {
        if (!/^\d+$/.test(event.target.value)) return
        if (event.target.value.length <= 15) {
          setInputCarAlterImeiValue(event.target.value)
          dispatch(carsSettingsActions.setCurrentSelectBlock({ ...carObject, selectBlockObject: { ...carObject.selectBlockObject, alter_imei: event.target.value } }))
        }
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    // Проверяем, была ли нажата клавиша "Enter"
    const key = e.key || e.keyCode || e.which;
    setTest(key)
    e.preventDefault()
    if (e.key === 'Enter') {
      const isModifiedData = store.getState().carsSettings.config.currentSelectBlock
      if (isModifiedData) {
        dispatch(carsSettingsActions.setChooseInputName(null))
        startUpdate()
      } else {
        dispatch(carsSettingsActions.setChooseInputName(null))
      }
    }
  };

  function startUpdate() {
    // startBackDrop()
    updateDataRequest().then((data) => {
      console.log("▶ ⇛ updateDataRequestdata:", data);

    }).catch((err) => {
      console.warn("При обновлении произошла ошибка ", err);

      showAlert('Ошибка при обновлении', 'error')
      setUpdateForm((cur) => !cur)
    })
  }

  useEffect(() => {
    setInputCarNameValue(car.name)
    setInputCarImeiValue(car.imei)
    setInputCarAlterImeiValue(car.alter_imei)
    setInputCarIconIdValue(car.pic)

  }, [car])

  const detectKey = (e: KeyboardEvent) => {
    // const key = e.key || e.keyCode || e.which;
    const key = e.keyCode || e.which;
    setTest(key)
  }
  useEffect(() => {
    document.addEventListener('keydown', detectKey, true)
  }, [])

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
              autoFocus 
              name={'car_name'}
              onClick={handleInputClick}
              onChange={(e) => handleFieldChange(e)}
              // onKeyDown={handleKeyDown} // Enter
              // onKeyUp={handleKeyDown} // Enter
            className={chooseInputFromStore === CAR_KEY.name ? "all-white-input--choose-style" : "all-white-input-style"}
            style={{
              textAlign: 'center',
              width: `100%`,
              // width: `calc(${car.name.length}ch + 22px)`,
            }}
              type="text"
              // readOnly
              readOnly={chooseInputFromStore !== CAR_KEY.name}
            value={inputCarNameValue}
            data-forstore={CAR_KEY.name}
          />
        </Stack>
          {/*  TEST*/}
          <Stack sx={{ backgroundColor: '#078c75', color: 'white' }}>
            <Typography align="center">{test}</Typography>
          </Stack>
          {/* TEST */}
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
              autoFocus
              name={'car_imei'}
              onClick={handleInputClick}
              onChange={(e) => handleFieldChange(e)}
              // onKeyDown={handleKeyDown} // Enter
              // onKeyUp={handleKeyDown} // Enter
              // onTouchStart={(evt) => handleNumberValidateTouch(evt)}
            className={chooseInputFromStore === CAR_KEY.imei ? "all-white-input--choose-style" : "all-white-input-style"}
              style={{
                textAlign: 'center',
                width: `100%`,
                // width: `calc(${car.imei.length}ch + 22px)` 
              }}
              // type="number"
              type="tel" inputMode="numeric" pattern="\d*"
              // readOnly
              readOnly={chooseInputFromStore !== CAR_KEY.imei}
            value={inputCarImeiValue}
            data-forstore={CAR_KEY.imei}
              data-interactive
          />
        </Stack>
      </Grid>

      {/* Imei-2 */}
      <Grid item xs={6}>
        <Stack display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <input
              name={'car_alterimei'}
            onClick={handleInputClick}
              onChange={(e) => handleFieldChange(e)}
              // onKeyDown={handleKeyDown} // Enter
              // onKeyUp={handleKeyDown} // Enter
            className={chooseInputFromStore === CAR_KEY.altImei ? "all-white-input--choose-style" : "all-white-input-style"}
              style={{
                textAlign: 'center',
                width: `100%`,
                // width: `calc(${car.alter_imei?.length || 0}ch + 22px)` 
              }}
              // type="number"
              autoComplete="off"
              type="tel" inputMode="numeric" pattern="\d*"
              // readOnly
              readOnly={chooseInputFromStore !== CAR_KEY.altImei}
            value={inputCarAlterImeiValue || ''}
            data-forstore={CAR_KEY.altImei}
              data-interactive
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
      {alertComponent}
    </>
  )
}
export default SmFieldCars;
