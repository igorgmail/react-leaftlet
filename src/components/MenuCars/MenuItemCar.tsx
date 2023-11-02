import React, { useState, useEffect, useMemo, FC } from 'react';
import { Stack, Checkbox, FormControlLabel } from '@mui/material';
import { ICarObject, IOneCarForMenu } from '../../types/carsTypes';

import { useAppDispatch, useAppSelector, carsMapActions } from '../../store';

import style from './style.module.css'

interface IMenuItems {
  carData: IOneCarForMenu,
}

const MenuItemCar: FC<IMenuItems> = React.memo(({ carData }) => {
  // console.log("---Render Checkbox");
  // console.log("▶ ⇛ carData:", carData);

  const dispatch = useAppDispatch()
  const carsForMenuFromStore = useAppSelector((state) => state.carsMap?.forMenu);

  const [isChecked, setIsChecked] = useState(true);

  const handleClose = (e: any) => {
    e.stopPropagation();
  }

  const checkboxChange = (e: any) => {
    setIsChecked((prev) => !prev); // Используйте функциональное обновление состояния
    const carChoose_id: number = Number(e.target.id)
    const carChoose_value: boolean = e.target.checked
    console.log('Check Change', e.target.id);
    console.log('IS Checked', e.target.checked);
    dispatch(carsMapActions.setChooseCheckbox({ carChoose_id, carChoose_value }))
    dispatch(carsMapActions.setCarsFilterMarkers({ [carChoose_id]: carChoose_value }))
  }

  return (
    <Stack>
      <FormControlLabel
        control={
          <Checkbox
            checked={carData.checked}
            onChange={checkboxChange}
            id={String(carData.car_id)}
          />
        }
        label={carData.car_name}
        onClick={handleClose}
        className={style.carsMenuLable}
      />
    </Stack>
  );
});

export default MenuItemCar;
