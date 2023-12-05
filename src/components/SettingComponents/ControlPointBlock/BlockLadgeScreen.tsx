import React, { useState, useEffect, FC } from "react"

import { Container, Stack, Box, Typography, Grid, Divider } from "@mui/material"


import { ICarObject, TRemoveDialogCallback } from "../types/carsSettingsTypes";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import RemoveDialog from "../CarsBlock/RemoveDialog";

import { TPointsData } from "../types/carsSettingsTypes";

import '../styles/style.css'

interface IPointDataProps {
  pointData: TPointsData[]
}


const BlockLadgeScreen: FC<IPointDataProps> = ({ pointData }) => {


  const handleDialog = (eventData: TRemoveDialogCallback) => {
    console.log("▶ ⇛ eventData:", eventData);
  }

  return (
    <Stack sx={{ flexGrow: 1, overflow: 'hidden' }}>

      <Stack
        display={'flex'} justifyContent={'center'}
        sx={{
          backgroundColor: '#078c75',
          color: 'white',
          borderRadius: '10px',
          // borderTopLeftRadius: '10px',
          // borderTopRightRadius: '10px',
          padding: '.8rem',
          // paddingLeft: '1rem',
          // paddingTop: '1rem',
          marginBottom: '8px'
        }}>
        <Typography variant="h6" align="left" gutterBottom sx={{ marginBottom: '0' }}>
          Контрольные точки
        </Typography>
      </Stack>

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
          <Grid item xs={6}>
            <Stack display={'flex'} alignItems={'center'}>Адрес</Stack>
          </Grid>
          <Grid item xs={3}>
            <Stack display={'flex'} alignItems={'center'}>Радиус</Stack>
          </Grid>
        </Grid>


        <Grid container
          sx={{
            backgroundColor: 'white',
            paddingLeft: '.8rem'
          }}
        >
          {pointData.length > 0 && pointData.map((point) => (
            <>
              {/* Name */}
              <Grid item xs={3} display={'flex'} justifyContent={'flex-start'}>
                <Stack display={'flex'} flexDirection={'row'} alignItems={'center'} >

                  {/* Remove Button */}
                  {/* <Button
                  sx={{
                    minWidth: '10px', width: '2rem',
                    "& .MuiButton-startIcon": { margin: "auto" }
                  }}
                  // variant="outlined"
                  startIcon={<ClearIcon sx={{ marginLeft: '0' }} />}></Button> */}
                  {/* <RemoveDialog callback={handleDialog} 
                  eventData={makeEventData(car)} 
                  /> */}

                  <input
                    readOnly={true}
                    className="inputFocusStyle"
                    style={{
                      width: `calc(${point.name.length}ch + 22px)`,
                      // margin: 'auto'
                    }}
                    defaultValue={point.name}
                  />
                </Stack>
              </Grid>

              {/* Address */}
              <Grid item xs={6} display={'flex'} justifyContent={'center'}>
                <Stack>
                  <Box margin={'auto'} display={'flex'} alignItems={'center'}>
                    {/* <img src={point.pic}
                      style={{ transform: 'rotate(90deg)', width: '2rem' }}
                      alt="Иконка"></img> */}
                  </Box>
                </Stack>
              </Grid>

              {/* Radius */}
              <Grid item xs={3} display={'flex'} alignItems={'center'}>
                <Stack>
                  <input
                    className="inputFocusStyle"
                    style={{ width: `calc(${point.radius.length}ch + 22px)`, fontSize: '0.8rem' }}
                    type="text"
                    readOnly={true}
                    defaultValue={point.radius} />
                </Stack>
              </Grid>

              <Divider />
            </>
          ))
          }

        </Grid>

      </Stack>

    </Stack >
  )
}
export default BlockLadgeScreen