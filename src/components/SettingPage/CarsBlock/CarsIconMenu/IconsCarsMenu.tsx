import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Box, Grid, Stack } from '@mui/material';
import { useAppSelector } from '../../../../store';

import IconsCarsBlockNet from './IconsCarsBlockNet';

type TIconsCarsMenuProps = {
  children: React.ReactNode,
  handleIconCarInNetClick: (e: React.MouseEvent, popupState: any) => void
}

const IconsCarsMenu: React.FC<TIconsCarsMenuProps> = ({ children, handleIconCarInNetClick }) => {

  const iconsCars = useAppSelector((store) => store.carsSettings.icons)
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
    <PopupState variant="popover" popupId="icons-popup-popover">
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
            <Box style={{ outline: 'none' }} padding={2} margin="auto" maxWidth={600}>
              <Grid container>


                {iconsCars && iconsCars.map((oneIcon) =>
                (<IconsCarsBlockNet
                  iconObject={oneIcon}
                  handleIconCarInNetClick={handleIconCarInNetClick}
                  popupState={popupState}
                />))
                }
                {/* <Stack className='cars-popup--wrap'>

              <Stack
                className='cars-popup--row-block'>
                <Stack className='cars-popup--item' onClick={(e) => handleImageClick(e)}>
                  <img src={iconsCars[0].url} className='cars-popup--image'></img>
                </Stack>
                <Stack className='cars-popup--item'>
                  <img src={iconsCars[1].url} className='cars-popup--image'></img>
                </Stack>
                <Stack className='cars-popup--item'>
                  <img src={iconsCars[2].url} className='cars-popup--image'></img>
                </Stack>
              </Stack>
              <Stack
                className='cars-popup--row-block'>
                <Stack className='cars-popup--item'>
                  <img src={iconsCars[3].url} className='cars-popup--image'></img>
                </Stack>
                <Stack className='cars-popup--item'>
                  <img src={iconsCars[4].url} className='cars-popup--image'></img>
                </Stack>
                <Stack className='cars-popup--item'>
                  <img src={iconsCars[5].url} className='cars-popup--image'></img>
                </Stack>
              </Stack>
              <Stack
                className='cars-popup--row-block'>
                <Stack className='cars-popup--item'>
                  <img src={iconsCars[6].url} className='cars-popup--image'></img>
                </Stack>
                <Stack className='cars-popup--item'>
                  <img src={iconsCars[7].url} className='cars-popup--image'></img>
                </Stack>
                <Stack className='cars-popup--item'>
                  <img src={iconsCars[8].url} className='cars-popup--image'></img>
                </Stack>
              </Stack>

            </Stack> */}
              </Grid>
            </Box>

          </Popover>
        </div>
      )
      }
    </PopupState >
  );
}





export default IconsCarsMenu