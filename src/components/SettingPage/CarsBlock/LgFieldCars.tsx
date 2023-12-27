import { Divider, Grid, Stack } from "@mui/material"
import { ICarObject, TEventForDialog, TEventFromDialog, TEventsData, TPointsData, TSelectedFieldChanged, TUsers } from "../types/carsSettingsTypes";
import { FC, useCallback, useEffect, useState } from "react";

import RemoveDialog from "../components/RemoveDialog";
// import IconsCarsMenu from "./CarsIconMenu/IconsCarsMenu";

import ModalWithIconsCars from "./CarsIconMenu/AddModalWithIconsCars";

import { useAppDispatch, useAppSelector, carsSettingsActions, store } from "../../../store";

import useRemoveDialog from "../hooks/useRemoveDialog";
import useBackDrop from "../hooks/useBackdrop";
import useAlert from "../hooks/useAlert";
import useUpdateData from "../hooks/useUpdateData";

interface ILgFieldCarsProps {
  car: ICarObject,
  setUpdateForm: React.Dispatch<React.SetStateAction<boolean>>
}


const LgFieldCars: FC<ILgFieldCarsProps> = ({ car, setUpdateForm }) => {
  console.log("--Render CarsField Large");

  const iconsCars = useAppSelector((store) => store.carsSettings.icons)
  const chooseInputFromStore = useAppSelector((store) => store.carsSettings.config.chooseInputName)


  const [inputCarNameValue, setInputCarNameValue] = useState(car.name);
  const [inputCarImeiValue, setInputCarImeiValue] = useState(car.imei);
  const [inputCarAlterImeiValue, setInputCarAlterImeiValue] = useState(car.alter_imei);
  const [inputCarIconIdValue, setInputCarIconIdValue] = useState<string>(car.pic);
  const [modalOpen, setModalOpen] = useState(false);

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
    event.preventDefault()
    const touchNumber = event.detail
    // const itemName = (event.target as HTMLInputElement).getAttribute('name')
    // console.log("▶ ⇛ itemName:", itemName);

    if (touchNumber === 2) {
      const targ = event.currentTarget
      const dataValue = targ.dataset.forstore
      const inputType = event.currentTarget.type
      targ.focus()

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

  const handleNumberValidate = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    (evt.key === 'e'
      || evt.key === '-'
      || evt.key === '+')
      && evt.preventDefault()
  }

  const handleIconCarInNetClick = (e: React.MouseEvent) => {
    handleFieldChange(e)
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
        if (event.target.value.length <= 15) {
          setInputCarImeiValue(event.target.value)
          dispatch(carsSettingsActions.setCurrentSelectBlock({ ...carObject, selectBlockObject: { ...carObject.selectBlockObject, imei: event.target.value } }))
        }
      }
      if (itemName === 'car_alterimei') {
        if (event.target.value.length <= 15) {
          setInputCarAlterImeiValue(event.target.value)
          dispatch(carsSettingsActions.setCurrentSelectBlock({ ...carObject, selectBlockObject: { ...carObject.selectBlockObject, alter_imei: event.target.value } }))
        }
      }

    }
    if (event.currentTarget.hasAttribute('data-iconid')) {
      const target = event.currentTarget as HTMLElement;
      const chooseIconUrl = iconsCars.find((obj) => obj.icon_id === String(target.dataset.iconid))
      setInputCarIconIdValue(chooseIconUrl?.url || '')
      dispatch(carsSettingsActions.setCurrentSelectBlock({ ...carObject, selectBlockObject: { ...carObject.selectBlockObject, pic: chooseIconUrl?.url || '' } }))
      startUpdate()
    }

  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Проверяем, была ли нажата клавиша "Enter"
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
    console.log("▶ ⇛ IN startUpdate:");

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

  return (
    <>
    <Grid container
      sx={{
        backgroundColor: 'white',
        paddingLeft: '.8rem'
      }}
      data-carid={car.car_id}
        // data-interactive
    >

      {/* Name */}
      <Grid item xs={3} md={3} display={'flex'} justifyContent={'flex-start'}>
        <Stack display={'flex'} flexDirection={'row'} alignItems={'center'} >

          <RemoveDialog callback={handleDialog} eventData={makeEventData(car)} />

          <input
              name={'car_name'}
              onClick={handleInputClick}
              onChange={(e) => handleFieldChange(e)}
              onKeyDown={handleKeyDown}
              // onTouchStart={handleTouchCarNameInput}
            onMouseDown={() => { }}
            className={chooseInputFromStore === CAR_KEY.name ? "all-white-input--choose-style" : "all-white-input-style"}
            style={{
              width: `100%`,
              // width: `calc(${car.name.length}ch + 22px)`,
            }}
            readOnly={chooseInputFromStore !== CAR_KEY.name}
              // onChange={(e) => setInputCarNameValue(e.target.value)}
            value={inputCarNameValue}
            data-forstore={CAR_KEY.name}
            data-interactive

          />
        </Stack>
      </Grid>

      {/* Icon */}
      <Grid item xs={2} md={3} display={'flex'} justifyContent={'center'}>
        <Stack margin={'auto'} display={'flex'} alignItems={'center'}
        >
          {/* Popup Cars Icons */}
          <ModalWithIconsCars
            handleIconCarInNetClick={handleIconCarInNetClick}
            iconParentId={car.car_id}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
          >
            <img
              src={inputCarIconIdValue}
              className="carblock-icon-cars"
              style={{
                transform: 'rotate(90deg)', width: '2rem',
                position: 'relative'
              }}
              alt="Иконка"
              data-forstore={CAR_KEY.parentPic}
              data-interactive
              data-interactive-image
            >
            </img>
          </ModalWithIconsCars>

        </Stack>
      </Grid>

      {/* Imei */}
      <Grid item xs={3} md={3} display={'flex'} alignItems={'center'}>
        <Stack>
          <input
              name={'car_imei'}
              onClick={handleInputClick}
              onChange={(e) => handleFieldChange(e)}
              onKeyDown={(evt) => handleNumberValidate(evt)}
              // onChange={(e) => setInputCarImeiValue(e.target.value)}
            className={chooseInputFromStore === CAR_KEY.imei ? "all-white-input--choose-style" : "all-white-input-style"}
            style={{
              width: '100%',
              // width: `calc(${car.imei.length}ch + 22px)`, fontSize: '0.8rem'
            }}
              // type="number"
              type="tel" inputMode="numeric" pattern="\d*"
            readOnly={chooseInputFromStore !== CAR_KEY.imei}
            value={inputCarImeiValue}
            data-forstore={CAR_KEY.imei}
            data-interactive
          />
        </Stack>
      </Grid>

      {/* Imei-2 */}
      <Grid item xs={4} md={3} display={'flex'} alignItems={'center'}>
        <Stack >
          <input
              name={'car_alterimei'}
              onClick={handleInputClick}
              onChange={(e) => handleFieldChange(e)}
              onKeyDown={(evt) => handleNumberValidate(evt)}
              // onChange={(e) => setInputCarAlterImeiValue(e.target.value)}
            className={chooseInputFromStore === CAR_KEY.altImei ? "all-white-input--choose-style" : "all-white-input-style"}
            style={{
              width: '100%',
              // width: `calc(${car.alter_imei?.length || 0}ch + 22px)`, fontSize: '0.8rem'
            }}
              type="number"
            readOnly={chooseInputFromStore !== CAR_KEY.altImei}
            value={inputCarAlterImeiValue || ''}
            data-forstore={CAR_KEY.altImei}
            data-interactive
          />
        </Stack>
      </Grid>
      <Divider />
    </Grid>
      {BackDropComponent}
      {alertComponent}
    </>
  )
}


export default LgFieldCars