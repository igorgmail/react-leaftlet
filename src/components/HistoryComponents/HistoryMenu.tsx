import React, { FC } from 'react';
import { IconButton, Menu, MenuItem, Typography, Divider, Stack, Paper, Button, Box } from '@mui/material/';
import { TextField } from '@mui/material/';
import { IconHistory } from './IconHistory';
import { IconCar } from '../HistoryComponents/IconCar';
import { styled } from '@mui/material/styles';

import style from './style.module.css'

import { ICarObject } from '../../types/carsTypes';

interface CarProps {
  car: ICarObject
}

const HistoryMenu: FC<CarProps> = ({ car }) => {
  console.log("---Render HistoryMenu");
  console.log("▶ ⇛ car: In HIStory", car);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChooseMenu = (event: React.FormEvent) => {
    event.preventDefault()
    event.stopPropagation()

    console.log("Вы выбрали меню");
    console.log(event);

  }

  const handleChooseDateFor = (event: React.FormEvent) => {
    event.preventDefault()
    event.stopPropagation()

    console.log("handleChooseDateFor");
    console.log(event);

  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


  return (
    <div>
      <IconButton
        onClick={handleClick}
        size="small"
        // sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <IconHistory />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
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
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Stack
          display={'flex'} flexDirection={'row'} justifyContent={'space-between'}
          sx={{
            margin: '8px 16px'
          }}
        >
          <Typography variant="h6">История</Typography>

          <Stack display={'flex'} flexDirection={'row'} justifyContent={'center'}
            gap={'20px'} alignItems={'center'}>
            <Typography variant="subtitle2">{car.car_name}</Typography>
            <IconCar size='20px'></IconCar>
          </Stack>

        </Stack>

        <Divider />

        {/* <form onSubmit={handleChooseMenu}>
          <Stack display={'flex'} flexDirection={'column'} gap={'25px'} m={'10px'}>
            <Item>
              <label htmlFor="timeFrom">От :</label>
              <input className={style.input} type="datetime-local" id="timeFrom" name="timeFrom" onChange={handleChooseDateFor} />
            </Item>

            <Item>
              <label htmlFor="timeTo">До :</label>
              <input className={style.input} type="datetime-local" id="timeTo" name="timeTo" />
            </Item>
            <Box>
              <Button type="submit" variant="outlined" style={{ width: '60%', margin: 'auto' }}>Показать</Button>
            </Box>
        </Stack>
        </form> */}
        <Stack display={'flex'} flexDirection={'row'} gap={'25px'} m={'10px'}>
          {/* <Item> */}
          <Stack className={style.inputHead}>
            От :
          </Stack>

          <TextField
            name="someDate"
            label="Дата"
            InputLabelProps={{ shrink: true, required: true }}
            type="date"
            defaultValue={'30-1-1980'}
            className={style.inputField}
            size="small"

          />
          <TextField
            name="someDate"
            label="Время"
            InputLabelProps={{ shrink: true, required: true }}
            type="time"
            defaultValue={'00-00'}
            size="small"
          />
          {/* </Item> */}
        </Stack>

        <Stack display={'flex'} flexDirection={'row'} gap={'25px'} m={'10px'}>
          {/* <Item> */}
          <Stack className={style.inputHead}>
            От :
          </Stack>

          <TextField
            name="someDate"
            label="Дата"
            InputLabelProps={{ shrink: true, required: true }}
            type="date"
            defaultValue={'30-1-1980'}
            className={style.inputField}
            size="small"

          />
          <TextField
            name="someDate"
            label="Время"
            InputLabelProps={{ shrink: true, required: true }}
            type="time"
            defaultValue={'00-00'}
            size="small"
          />
          {/* </Item> */}
        </Stack>
        <Stack>
          <Button type="submit" variant="outlined" style={{ width: '60%', margin: 'auto' }}>Показать</Button>

        </Stack>

      </Menu>
    </div>
  );
}


export { HistoryMenu }