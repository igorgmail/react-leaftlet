import { Divider, Grid, Stack } from "@mui/material"
import { ICarObject, TEventForDialog, TEventFromDialog } from "../types/carsSettingsTypes";
import { FC, useState } from "react";

import RemoveDialog from "../components/RemoveDialog";
// import IconsCarsMenu from "./CarsIconMenu/IconsCarsMenu";

import ModalWithIconsCars from "./CarsIconMenu/AddModalWithIconsCars";

import { useAppDispatch, useAppSelector, carsSettingsActions } from "../../../store";

import useRemoveDialog from "../hooks/useRemoveDialog";
import useBackDrop from "../hooks/useBackdrop";

interface ILgFieldCarsProps {
  car: ICarObject,
}

const LgFieldCars: FC<ILgFieldCarsProps> = ({ car }) => {
  console.log("--Render CarsField Large");

  const iconsCars = useAppSelector((store) => store.carsSettings.icons)
  const chooseInputFromStore = useAppSelector((store) => store.carsSettings.config.chooseInputName)


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
    name: `id${car.name}-carName`,
    imei: `id${car.imei}-carImei`,
    altImei: `id${car.alter_imei}-altCarImei`,
    pic: `id${car.pic}-carPic`,
    parentPic: `id${car.car_id}-parentIcon`
  }


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
            onClick={handleInputClick}   // onTouchStart={handleTouchCarNameInput}
            onMouseDown={() => { }}
            className={chooseInputFromStore === CAR_KEY.name ? "all-white-input--choose-style" : "all-white-input-style"}
            style={{
              width: `calc(${car.name.length}ch + 22px)`,
            }}
            readOnly={chooseInputFromStore !== CAR_KEY.name}
            onChange={(e) => setInputCarNameValue(e.target.value)}
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
            onClick={handleInputClick}
            onChange={(e) => setInputCarImeiValue(e.target.value)}
            className={chooseInputFromStore === CAR_KEY.imei ? "all-white-input--choose-style" : "all-white-input-style"}
            style={{
              width: `calc(${car.imei.length}ch + 22px)`, fontSize: '0.8rem'
            }}
              type="number"
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
            onClick={handleInputClick}
            onChange={(e) => setInputCarAlterImeiValue(e.target.value)}
            className={chooseInputFromStore === CAR_KEY.altImei ? "all-white-input--choose-style" : "all-white-input-style"}
            style={{
              width: `calc(${car.alter_imei?.length || 0}ch + 22px)`, fontSize: '0.8rem'
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
    </>
  )
}


export default LgFieldCars