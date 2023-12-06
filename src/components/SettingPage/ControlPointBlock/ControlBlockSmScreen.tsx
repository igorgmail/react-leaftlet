import React, { useState, useEffect, FC } from "react"

import { Container, Stack, Box, Typography, Grid, Divider } from "@mui/material"


import { ICarObject, TRemoveDialogCallback } from "../types/carsSettingsTypes";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


import { TPointsData } from "../types/carsSettingsTypes";
import RemoveDialog from "../components/RemoveDialog";

interface IPointDataProps {
  pointData: TPointsData[]
}

const ControlBlockSmScreen: FC<IPointDataProps> = ({ pointData }) => {


  const handleDialog = (eventData: TRemoveDialogCallback) => {
    console.log("▶ ⇛ eventData:", eventData);
  }

  const makeEventData = (point: TPointsData) => {

    const eventData = {
      event: 'REMOVE_POINT',
      subjectid: point.point_id,
      msg: `Будет удалена контрольная точка <br>${point.name}`
    }

    return eventData
  }

  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>

      {pointData.map((point) => (

        <Grid
          key={`control-block-` + point.point_id}
          container alignItems="center" justifyContent="center"
          sx={{
            backgroundColor: 'white',
            marginTop: '2rem',
            borderRadius: '10px'
          }}>

          {/* Block - 1 */}
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
              <Typography align="center">Радиус</Typography>
            </Stack>

          </Grid>

          {/* Name */}
          <Grid item xs={6}>
            <Stack display={'flex'} flexDirection={'row'} justifyContent={'flex-start'}>

              <RemoveDialog callback={handleDialog}
                eventData={makeEventData(point)} />

              <input
                className="all-white-input-style"
                style={{
                  width: `calc(${point.name.length}ch + 30px)`,
                }}
                type="text"
                readOnly={true}
                defaultValue={point.name} />
            </Stack>
          </Grid>

          {/* Radius */}
          <Grid item xs={6}>
            <Stack display={'flex'} alignItems={'center'} justifyContent={'center'}>
              <input
                className="all-white-input-style"
                style={{ width: `calc(${point.radius.length}ch + 22px)`, fontSize: '0.8rem' }}
                type="text"
                readOnly={true}
                defaultValue={point.radius} />
            </Stack>
          </Grid>

          {/* Block - 2 */}
          <Grid item xs={12}>
            <Stack sx={{ backgroundColor: '#078c75', color: 'white' }}>
              <Typography align="center">Адресс</Typography>
            </Stack>
          </Grid>

          {/* Address */}
          <Grid item xs={6}>
            <Stack display={'flex'} justifyContent={'center'} alignItems={'center'}
              sx={{ padding: '8px' }}
            >
              <input
                className="all-white-input-style"
                style={{ width: `calc(${point.name.length}ch + 30px)` }}
                type="text"
                readOnly={true}
                defaultValue={point.name || ''} />
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
      ))
      }




    </Box >
  )
}
export default ControlBlockSmScreen