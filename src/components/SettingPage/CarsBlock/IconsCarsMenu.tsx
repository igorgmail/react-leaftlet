import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Grid, Stack } from '@mui/material';


type TIconsCarsMenuProps = {
  children: React.ReactNode
}

const IconsCarsMenu: React.FC<TIconsCarsMenuProps> = ({ children }) => {
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);
  // // const open = isOpen
  // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Button  {...bindTrigger(popupState)}
            sx={{ padding: '0' }}
          >
            {children}
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >

            <Stack className='cars-popup--wrap'>

              <Stack
                className='cars-popup--row-block'>
                <Stack className='cars-popup--item'>
                  <img src='/img/car1.png' className='cars-popup--image'></img>
                </Stack>
                <Stack className='cars-popup--item'>
                  <img src='/img/car1.png' className='cars-popup--image'></img>
                </Stack>
                <Stack className='cars-popup--item'>
                  <img src='/img/car1.png' className='cars-popup--image'></img>
                </Stack>
              </Stack>
              <Stack
                className='cars-popup--row-block'>
                <Stack className='cars-popup--item'>
                  <img src='/img/car1.png' className='cars-popup--image'></img>
                </Stack>
                <Stack className='cars-popup--item'>
                  <img src='/img/car1.png' className='cars-popup--image'></img>
                </Stack>
                <Stack className='cars-popup--item'>
                  <img src='/img/car1.png' className='cars-popup--image'></img>
                </Stack>
              </Stack>
              <Stack
                className='cars-popup--row-block'>
                <Stack className='cars-popup--item'>
                  <img src='/img/car1.png' className='cars-popup--image'></img>
                </Stack>
                <Stack className='cars-popup--item'>
                  <img src='/img/car1.png' className='cars-popup--image'></img>
                </Stack>
                <Stack className='cars-popup--item'>
                  <img src='/img/car1.png' className='cars-popup--image'></img>
                </Stack>
              </Stack>

            </Stack>


          </Popover>
        </div>
      )
      }
    </PopupState >
  );
}





export default IconsCarsMenu