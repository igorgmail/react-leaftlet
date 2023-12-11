import { Button, Divider, Grid, Stack } from "@mui/material"
import { ICarObject, TRemoveDialogCallback } from "../types/carsSettingsTypes";
import { FC, ReactElement, ReactEventHandler, useEffect, useRef, useState } from "react";
import { makeEventData } from "./utils/makeEventData";
import RemoveDialog from "../components/RemoveDialog";
// import IconsCarsMenu from "./CarsIconMenu/IconsCarsMenu";

import ModalWithIconsCars from "./CarsIconMenu/AddModalWithIconsCars";

import { useAppDispatch, useAppSelector, carsSettingsActions } from "../../../store";


interface ICarsFieldProps {
  car: ICarObject,
}

const LargeCarsField: FC<ICarsFieldProps> = ({ car }) => {
  console.log("--Render CarsField Large");

  const iconsCars = useAppSelector((store) => store.carsSettings.icons)
  const chooseInputFromStore = useAppSelector((store) => store.carsSettings.config.chooseInputName)


  const [inputCarNameValue, setInputCarNameValue] = useState(car.name);
  const [inputCarImeiValue, setInputCarImeiValue] = useState(car.imei);
  const [inputCarAlterImeiValue, setInputCarAlterImeiValue] = useState(car.alter_imei);
  const [inputCarIconIdValue, setInputCarIconIdValue] = useState<string>(car.pic);
  const [modalOpen, setModalOpen] = useState(false);



  const dispatch = useAppDispatch()

  const handleDialog = (eventData: TRemoveDialogCallback) => {
    console.log("▶ ⇛ eventData:", eventData);
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

  const handleIconCarInNetClick = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLImageElement;
    if (target.dataset.iconid) {
      const chooseIconUrl = iconsCars.find((obj) => obj.icon_id === String(target.dataset.iconid))
      setInputCarIconIdValue(chooseIconUrl?.url || '')
    }
    setModalOpen(false)
  }




  return (

    <Grid container
      sx={{
        backgroundColor: 'white',
        paddingLeft: '.8rem'
      }}
      data-carid={car.car_id}
      data-interactive
    >

      {/* Name */}
      <Grid item xs={3} md={3} display={'flex'} justifyContent={'flex-start'}>
        <Stack display={'flex'} flexDirection={'row'} alignItems={'center'} >

          <RemoveDialog callback={handleDialog} eventData={makeEventData(car)} />

          <input
            onClick={handleInputClick}   // onTouchStart={handleTouchCarNameInput}
            onMouseDown={() => { }}
            className={chooseInputFromStore === `id${car.car_id}-carName` ? "all-white-input--choose-style" : "all-white-input-style"}
            style={{
              width: `calc(${car.name.length}ch + 22px)`,
            }}
            readOnly={chooseInputFromStore !== `id${car.car_id}-carName`}
            onChange={(e) => setInputCarNameValue(e.target.value)}
            value={inputCarNameValue}
            data-forstore={`id${car.car_id}-carName`}
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
              data-forstore={`id${car.car_id}-carParentIcon`}
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
            className={chooseInputFromStore === `id${car.car_id}-carImei` ? "all-white-input--choose-style" : "all-white-input-style"}
            style={{
              width: `calc(${car.imei.length}ch + 22px)`, fontSize: '0.8rem'
            }}
            type="text"
            readOnly={chooseInputFromStore !== `id${car.car_id}-carImei`}
            value={inputCarImeiValue}
            data-forstore={`id${car.car_id}-carImei`}
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
            className={chooseInputFromStore === `id${car.car_id}-carImei-2` ? "all-white-input--choose-style" : "all-white-input-style"}
            style={{
              width: `calc(${car.alter_imei?.length || 0}ch + 22px)`, fontSize: '0.8rem'
            }}
            type="text"
            readOnly={chooseInputFromStore !== `id${car.car_id}-carImei-2`}
            value={inputCarAlterImeiValue || ''}
            data-forstore={`id${car.car_id}-carImei-2`}
            data-interactive
          />
        </Stack>
      </Grid>
      <Divider />
    </Grid>
  )
}


export default LargeCarsField