import { Divider, Grid, Stack, Typography } from "@mui/material"
import { ICarObject, TRemoveDialogCallback } from "../types/carsSettingsTypes";
import { FC, ReactElement, ReactEventHandler, useEffect, useRef, useState } from "react";
import { makeEventData } from "./utils/makeEventData";
import RemoveDialog from "../components/RemoveDialog";
import { useAppDispatch, useAppSelector, carsSettingsActions } from "../../../store";
// import IconsCarsMenu from "./CarsIconMenu/IconsCarsMenu";
import ModalWithIconsCars from "./CarsIconMenu/AddModalWithIconsCars";






interface ISmallCarsProps {
  car: ICarObject
}


const SmallCarsField: FC<ISmallCarsProps> = ({ car }) => {
  console.log("--Render SmallField");

  const dispatch = useAppDispatch()
  const iconsCars = useAppSelector((store) => store.carsSettings.icons)
  const chooseInputFromStore = useAppSelector((store) => store.carsSettings.config.chooseInputName)

  const [carIdValue, setCarIdValue] = useState(car.car_id);
  const [inputCarNameValue, setInputCarNameValue] = useState(car.name);
  const [inputCarImeiValue, setInputCarImeiValue] = useState(car.imei);
  const [inputCarAlterImeiValue, setInputCarAlterImeiValue] = useState(car.alter_imei);
  const [inputCarIconIdValue, setInputCarIconIdValue] = useState<string>(car.pic);
  const [modalOpen, setModalOpen] = useState(false);


  const handleDialog = (eventData: TRemoveDialogCallback) => {
    console.log("▶ ⇛ eventData:", eventData);

  }

  const handleIconCarInNetClick = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLImageElement;
    if (target.dataset.iconid) {
      const chooseIconUrl = iconsCars.find((obj) => obj.icon_id === String(target.dataset.iconid))
      setInputCarIconIdValue(chooseIconUrl?.url || '')
    }
  }

  const handleTouchCarNameInput = (event: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
    const targ = event.currentTarget
    targ.focus()

    // TODO Здесь нужна проверка на то что сейчас в сторе
    if (targ.dataset.forstore) dispatch(carsSettingsActions.setChooseInputName(targ.dataset.forstore))
    // Установка курсора в конец текста
    // targ.type = 'text'
    const textLength = targ.value.length;
    targ.setSelectionRange(textLength, textLength);
  }
  const handleImgClick = (event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
    const targ = event.currentTarget as HTMLElement
    console.log("▶ ⇛ targ:IMGiconname", targ.dataset.iconname);
  }

  useEffect(() => {
    console.warn("Состояние изменилось");
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
            // onClick={handleTouchCarNameInput}  
            onTouchStart={handleTouchCarNameInput}
            // onMouseDown={handleTouchCarNameInput}
            className={chooseInputFromStore === `id${car.car_id}-carName` ? "all-white-input--choose-style" : "all-white-input-style"}
            style={{
              width: `calc(${car.name.length}ch + 22px)`,
            }}
            type="text"
            readOnly={chooseInputFromStore !== `id${car.car_id}-carName`}
            onChange={(e) => setInputCarNameValue(e.target.value)}
            value={inputCarNameValue}
            data-forstore={`id${car.car_id}-carName`}
          />
        </Stack>
      </Grid>

      {/* Icon */}
      <Grid item xs={6}>
        <Stack display={'flex'} alignItems={'center'} justifyContent={'center'}
          onClick={handleImgClick}
          data-forstore={`id${car.car_id}-carIcon`}
        >
          <ModalWithIconsCars
            handleIconCarInNetClick={handleIconCarInNetClick}
            // name={`id${car.car_id}-carName`}
            iconParentId={car.car_id}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
          >
            <img
              src={inputCarIconIdValue}
              className="carblock-icon-cars"
              style={{ transform: 'rotate(90deg)', width: '2rem' }}
              alt="Иконка">
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
            onTouchStart={handleTouchCarNameInput}
            onChange={(e) => setInputCarImeiValue(e.target.value)}
            className={chooseInputFromStore === `id${car.car_id}-carImei` ? "all-white-input--choose-style" : "all-white-input-style"}
            style={{ width: `calc(${car.imei.length}ch + 22px)` }}
            type="text"
            readOnly={chooseInputFromStore !== `id${car.car_id}-carImei`}
            value={inputCarImeiValue}
            data-forstore={`id${car.car_id}-carImei`}
          />
        </Stack>
      </Grid>

      {/* Imei-2 */}
      <Grid item xs={6}>
        <Stack display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <input
            onTouchStart={handleTouchCarNameInput}
            onChange={(e) => setInputCarAlterImeiValue(e.target.value)}
            className={chooseInputFromStore === `id${car.car_id}-carImei-2` ? "all-white-input--choose-style" : "all-white-input-style"}
            style={{ width: `calc(${car.alter_imei?.length || 0}ch + 22px)` }}
            type="text"
            readOnly={chooseInputFromStore !== `id${car.car_id}-carImei-2`}
            value={inputCarAlterImeiValue || ''}
            data-forstore={`id${car.car_id}-carImei-2`}
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
export default SmallCarsField;
