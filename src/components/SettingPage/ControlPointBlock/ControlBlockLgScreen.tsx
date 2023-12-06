import React, { useState, useEffect, FC } from "react"

import { Container, Stack, Box, Typography, Grid, Divider } from "@mui/material"


import { ICarObject, TRemoveDialogCallback } from "../types/carsSettingsTypes";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import RemoveDialog from "../components/RemoveDialog";

import { TPointsData } from "../types/carsSettingsTypes";

import '../styles/style.css'

interface IPointDataProps {
  pointData: TPointsData[]
}


const ControlBlockLgScreen: FC<IPointDataProps> = ({ pointData }) => {


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
    <Stack sx={{ flexGrow: 1, overflow: 'hidden' }}>

      {/* Header Cars */}
      <Stack
        sx={{ marginBottom: '0' }}
      >
        <Grid container
          rowSpacing={1}
          sx={{
            marginTop: '0.8rem',
            backgroundColor: '#078c75',
            color: 'white',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            paddingLeft: '.8rem'
          }}>

          <Grid item xs={3} sx={{ borderTopLeftRadius: '8px' }}>
            <Stack >Имя</Stack>
          </Grid>
          <Grid item xs={7}>
            <Stack display={'flex'} alignItems={'center'}>Адрес</Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack display={'flex'} alignItems={'center'}>Радиус</Stack>
          </Grid>
        </Grid>



        {pointData.length > 0 && pointData.map((point) => (
          <Grid
            key={`control-block-` + point.point_id}
            container
            sx={{
              backgroundColor: 'white',
              paddingLeft: '.8rem'
            }}
          >
            {/* Name */}
            <Grid item xs={3} display={'flex'} justifyContent={'flex-start'}>
              <Stack display={'flex'} flexDirection={'row'} alignItems={'center'} >

                {/* Remove Button */}
                <RemoveDialog callback={handleDialog}
                  eventData={makeEventData(point)}
                />

                <input
                  className="all-white-input-style"
                  readOnly={true}
                  style={{
                    width: `calc(${point.name.length}ch + 30px)`,
                    // margin: 'auto'
                  }}
                  defaultValue={point.name}
                />
              </Stack>
            </Grid>

            {/* Address */}
            <Grid item xs={7} display={'flex'} justifyContent={'center'}>
              <Box margin={'auto'} display={'flex'} alignItems={'center'}>

              </Box>
            </Grid>

            {/* Radius */}
            <Grid item xs={2} display={'flex'} justifyContent={'center'}>
              {/* <Stack display={'flex'} alignItems={'center'}> */}
              <input
                className="all-white-input-style"
                style={{ width: `calc(${point.radius.length}ch + 22px)`, fontSize: '0.8rem' }}
                type="text"
                readOnly={true}
                defaultValue={point.radius} />
              {/* </Stack> */}
            </Grid>

            <Divider />
          </Grid>
        ))
        }



      </Stack>

    </Stack >
  )
}
export default ControlBlockLgScreen