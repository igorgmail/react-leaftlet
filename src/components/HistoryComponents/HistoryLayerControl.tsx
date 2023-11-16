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

  const menuHeaderData = useAppSelector((state) => state.carsMap.companyName);
  const dataFromDateForm = useAppSelector((state) => state.carsMap.carsItemFromHistoryForm);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

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
            <IconHistory className={style.menuIcon} sx={{ width: 20, height: 20 }} />
            {/* <HistoryMenu></HistoryMenu> */}
          </IconButton>
        </Tooltip>
      </Control>

      <Menu
        anchorEl={anchorEl}
        id="map-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              left: 14,
              // right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <Stack display={'flex'} justifyContent={'centr'} margin={'auto'}>
          <span className={style.menuCompanyName} id={String(menuHeaderData?.company_id)}>
            {menuHeaderData?.company_name}
          </span>
        </Stack>
        <Stack className={style.carsMenuBlock}>

          {/* <MenuItemCar></MenuItemCar> */}

        </Stack>

      </Menu>

    </div>
  );
}

export default React.memo(HistoryLayerControl);