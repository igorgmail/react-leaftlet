import { useState, useEffect, FC } from "react"

import { Stack, Grid, Divider } from "@mui/material"

import { ICarObject, TRemoveDialogCallback } from "../types/carsSettingsTypes";

import RemoveDialog from "../components/RemoveDialog";

interface ICarsBlockProps {
  carsData: ICarObject[],
}


const CarsLadgeScreen: FC<ICarsBlockProps> = ({ carsData }) => {


  const makeEventData = (carObject: ICarObject) => {

    const eventData = {
      event: 'REMOVE_CAR',
      subjectid: carObject.car_id,
      msg: `Будет удален автомобиль <br>${carObject.name}`
    }

    return eventData
  }

  const handleDialog = (eventData: TRemoveDialogCallback) => {
    console.log("▶ ⇛ eventData:", eventData);
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

          <Grid item xs={3} md={3} sx={{ borderTopLeftRadius: '8px' }}>
            <Stack >Имя</Stack>
          </Grid>
          <Grid item xs={2} md={3}>
            <Stack display={'flex'} alignItems={'center'}>Иконка</Stack>
          </Grid>
          <Grid item xs={3} md={3}>
            <Stack sx={{ paddingLeft: '8px' }}>Imei</Stack>
          </Grid>
          <Grid item xs={4} md={3}>
            <Stack sx={{ paddingLeft: '8px' }}>Imei-2</Stack>
          </Grid>
        </Grid>


        {/* <Grid container
          sx={{
            backgroundColor: 'white',
            paddingLeft: '.8rem'
          }}
        > */}

        {carsData.length > 0 && carsData.map((car) => (

          <Grid container
            key={`cars-block-` + car.car_id}
            sx={{
              backgroundColor: 'white',
              paddingLeft: '.8rem'
            }}
          >


            {/* Name */}
            <Grid item xs={3} md={3} display={'flex'} justifyContent={'flex-start'}>
              <Stack display={'flex'} flexDirection={'row'} alignItems={'center'} >

                {/* Remove Button */}
                {/* <Button
                    sx={{
                      minWidth: '10px', width: '2rem',
                      "& .MuiButton-startIcon": { margin: "auto" }
                    }}
                    // variant="outlined"
                    startIcon={<ClearIcon sx={{ marginLeft: '0' }} />}></Button> */}
                <RemoveDialog callback={handleDialog} eventData={makeEventData(car)} />

                <input
                  readOnly={true}
                  className="all-white-input-style"
                  style={{
                    width: `calc(${car.name.length}ch + 22px)`,
                    // margin: 'auto'
                  }}
                  defaultValue={car.name}
                />
              </Stack>
            </Grid>

            {/* Icon */}
            <Grid item xs={2} md={3} display={'flex'} justifyContent={'center'}>
              <Stack margin={'auto'} display={'flex'} alignItems={'center'}>

                <img src={car.pic}
                  className="carblock-icon-cars"
                  style={{
                    transform: 'rotate(90deg)', width: '2rem'
                  }}
                  alt="Иконка"></img>

              </Stack>
            </Grid>

            {/* Imei */}
            <Grid item xs={3} md={3} display={'flex'} alignItems={'center'}>
              <Stack>
                <input
                  className="all-white-input-style"
                  style={{
                    width: `calc(${car.imei.length}ch + 22px)`, fontSize: '0.8rem'
                  }}
                  type="text"
                  readOnly={true}
                  defaultValue={car.imei} />
              </Stack>
            </Grid>

            {/* Imei-2 */}
            <Grid item xs={4} md={3} display={'flex'} alignItems={'center'}>
              <Stack >
                <input
                  className="all-white-input-style"
                  style={{
                    width: `calc(${car.alter_imei?.length || 0}ch + 22px)`, fontSize: '0.8rem'
                  }}
                  type="text"
                  readOnly={true}
                  defaultValue={car.alter_imei || ''} />
              </Stack>
            </Grid>
            <Divider />
          </Grid>

        ))
        }

        {/* </Grid> */}

      </Stack>

    </Stack >


  )
}




export default CarsLadgeScreen