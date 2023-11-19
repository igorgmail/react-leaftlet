import React, { useState, FC, ReactComponentElement } from 'react'
import { useAppDispatch, useAppSelector, carsMapActions } from '../../store';

import L from 'leaflet';
import Control from 'react-leaflet-custom-control'

import style from './style.module.css'

import { Menu, Stack, Tooltip, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { IconHistory } from './IconComponent/IconHistory';
import HistoryMenu from './HistoryMenu';

interface ICustomLayerControl {
  // menuHeaderData?: ICompanyName,
  children?: React.ReactNode,
}
const HistoryLayerControl = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  console.log("--Render Contrlo History");

  const menuHeaderData = useAppSelector((state) => state.carsMap.companyName);
  const dataFromDateForm = useAppSelector((state) => state.carsMap.carsItemFromHistoryForm);
  console.log("▶ ⇛ dataFromDateForm:In COntrol", dataFromDateForm);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const newDataFromDateForm = {
    ...dataFromDateForm,
    company_id: dataFromDateForm?.company_id || '0',
    company_name: dataFromDateForm?.company_name || 'noname',
    dataFromIso: dataFromDateForm!.dataFromIso.slice(0, 16),
    dataToIso: dataFromDateForm!.dataToIso.slice(0, 16),
    car_id: dataFromDateForm?.car_id || '0',
    car_name: dataFromDateForm?.car_name || '',
    localOffset: dataFromDateForm?.localOffset || 0,

  }
  console.log("▶ ⇛ newDataFromDateForm:", newDataFromDateForm);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Control position='topleft' prepend={false} >
        <Tooltip title="History">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'History-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            className={style.menuIconButton}
          >
            {/* <IconHistory className={style.menuIcon} sx={{ width: 20, height: 20 }} /> */}
            {dataFromDateForm &&
              <HistoryMenu carData={newDataFromDateForm}></HistoryMenu>
            }
          </IconButton>
        </Tooltip>
      </Control>

    </div>
  );
}

export default HistoryLayerControl;