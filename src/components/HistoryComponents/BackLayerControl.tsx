import React, { useState, FC, ReactComponentElement } from 'react'
import { useAppDispatch, useAppSelector, carsMapActions } from '../../store';

import L from 'leaflet';
import Control from 'react-leaflet-custom-control'

import style from './style.module.css'

import { Menu, Stack, Tooltip, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconHistory } from './IconComponent/IconHistory';


const BackLayerControl = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const menuHeaderData = useAppSelector((state) => state.carsMap.companyName);
  const dispatch = useAppDispatch()
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log("BACK");
    dispatch(carsMapActions.setCarsMapVariant({ variant: 'all' }))
  };


  return (
    <div>
      <Control position='topleft' prepend={false} >
        <Tooltip title="Back">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'History-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            className={style.menuIconButton}
          >
            <ArrowBackIcon className={style.menuIcon} sx={{ width: 20, height: 20 }} />
          </IconButton>
        </Tooltip>
      </Control>
    </div>
  );
}

export default React.memo(BackLayerControl);