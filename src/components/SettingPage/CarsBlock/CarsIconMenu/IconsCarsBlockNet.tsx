import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { Grid, Stack, Box, Paper } from '@mui/material';
import { useAppSelector } from '../../../../store';


type TIconsNetProps = {
  iconObject: {
    icon_id: string,
    url: string,
  },
  handleIconCarInNetClick: (e: React.MouseEvent) => void
}

const IconsCarsBlockNet: React.FC<TIconsNetProps> = ({ iconObject, handleIconCarInNetClick }) => {
  return (

    <Grid item xs={4}>
      <Paper>

      <Stack
        className='cars-popup--item'
        data-iconid={iconObject.icon_id}
          onClick={(e) => handleIconCarInNetClick(e)}>
        <img src={iconObject.url} className='cars-popup--image'></img>
      </Stack>
      </Paper>
    </Grid>
  )
}
export default IconsCarsBlockNet