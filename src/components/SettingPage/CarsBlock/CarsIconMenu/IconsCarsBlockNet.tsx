import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Grid, Stack, Box, Paper } from '@mui/material';
import { useAppSelector } from '../../../../store';


type TIconsNetProps = {
  iconObject: {
    icon_id: string,
    url: string,
  },
  handleIconCarInNetClick: (e: React.MouseEvent, popupState: () => void) => void,
  popupState: any
}

const IconsCarsBlockNet: React.FC<TIconsNetProps> = ({ iconObject, handleIconCarInNetClick, popupState }) => {
  return (

    <Grid item xs={4} >
      <Stack
        className='cars-popup--item'
        data-iconid={iconObject.icon_id}
        onClick={(e) => handleIconCarInNetClick(e, popupState)}>
        <img src={iconObject.url} className='cars-popup--image'></img>
      </Stack>
    </Grid>



    // <Stack className='cars-popup--wrap'>

    //   <Stack
    //     className='cars-popup--row-block'>
    //     <Stack className='cars-popup--item'>
    //       <img src={iconsCars[0].url} className='cars-popup--image'></img>
    //     </Stack>
    //     <Stack className='cars-popup--item'>
    //       <img src={iconsCars[1].url} className='cars-popup--image'></img>
    //     </Stack>
    //     <Stack className='cars-popup--item'>
    //       <img src={iconsCars[2].url} className='cars-popup--image'></img>
    //     </Stack>
    //   </Stack>

    //   <Stack
    //     className='cars-popup--row-block'>
    //     <Stack className='cars-popup--item'>
    //       <img src={iconsCars[3].url} className='cars-popup--image'></img>
    //     </Stack>
    //     <Stack className='cars-popup--item'>
    //       <img src={iconsCars[4].url} className='cars-popup--image'></img>
    //     </Stack>
    //     <Stack className='cars-popup--item'>
    //       <img src={iconsCars[5].url} className='cars-popup--image'></img>
    //     </Stack>
    //   </Stack>
    //   <Stack
    //     className='cars-popup--row-block'>
    //     <Stack className='cars-popup--item'>
    //       <img src={iconsCars[6].url} className='cars-popup--image'></img>
    //     </Stack>
    //     <Stack className='cars-popup--item'>
    //       <img src={iconsCars[7].url} className='cars-popup--image'></img>
    //     </Stack>
    //     <Stack className='cars-popup--item'>
    //       <img src={iconsCars[8].url} className='cars-popup--image'></img>
    //     </Stack>
    //   </Stack>

    // </Stack>
  )
}
export default IconsCarsBlockNet