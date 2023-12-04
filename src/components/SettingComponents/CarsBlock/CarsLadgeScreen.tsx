import { useState, useEffect, FC } from "react"

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, Stack, Box, Typography, Grid } from "@mui/material"


import { ICarObject } from "../types/carsSettingsTypes";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { inputCarsDataDisableStyle, inputCarsIconStyle } from "../CompanyBlock/customStyle";
import './styles/style.css'

const styleHead = { borderBottom: 'none', padding: '0 1rem 8px', color: 'white', }
const styleCell = { padding: '0 4px' }



interface ICarsBlockProps {
  carsData: ICarObject[],
}



const CarsLadgeScreen: FC<ICarsBlockProps> = ({ carsData }) => {

  return (
    <TableContainer component={Paper} sx={{ borderRadius: '10px', overflow: 'hidden' }}>
      <Table
        aria-label="cars table">
        <TableHead sx={{
          backgroundColor: '#078c75', color: 'white',
          // borderTopLeftRadius: '10px', borderTopRightRadius: '10px',
          '&:last-child': { borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }
        }}>
          <TableRow>
            <TableCell colSpan={4} sx={{ ...styleHead, textAlign: 'left', padding: '0' }}>
              <Box fontWeight={500} ml={'1rem'} mt={'1rem'} fontSize={'1.2rem'}>Автомобили</Box>
            </TableCell>
          </TableRow>
          <TableRow  >
            <TableCell sx={{ ...styleHead, borderBottomLeftRadius: '10px' }}>Имя</TableCell>
            <TableCell sx={styleHead} align='center'>Иконка</TableCell>
            <TableCell sx={styleHead} align="left">IMEI</TableCell>
            <TableCell sx={{ ...styleHead, borderBottomRightRadius: '10px' }} align="left">IMEI-2</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {carsData.map((car) => (
            <TableRow
              key={car.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              {/* CarName */}
              <TableCell component="th" scope="row" sx={styleCell}
                onClick={() => console.log("Click Cars Name", car.name)}
              >
                <input
                  className="inputFocusStyle"
                  style={{
                    ...inputCarsDataDisableStyle,
                    width: `calc(${car.name.length}ch + 18px)`,
                  }}
                  type="text"
                  readOnly={true}
                  defaultValue={car.name} />
              </TableCell>

              {/* Icon */}
              <TableCell align="center" sx={styleCell}>
                <Box margin={'auto'}>
                  <img src={car.pic}
                    style={{ ...inputCarsIconStyle, transform: 'rotate(90deg)', width: '2rem' }}
                    alt="Иконка"></img>
                </Box>
              </TableCell>

              {/* Imei */}
              <TableCell align="left" sx={styleCell}>
                <input
                  className="inputFocusStyle"
                  style={{ ...inputCarsDataDisableStyle, width: `calc(${car.imei.length}ch + 20px)` }}
                  type="text"
                  readOnly={true}
                  defaultValue={car.imei} />
              </TableCell>

              {/* Imei-2 */}
              <TableCell align="left" sx={styleCell}>
                <input
                  className="inputFocusStyle"
                  style={{ ...inputCarsDataDisableStyle, width: `calc(${car.alter_imei?.length || 0}ch + 18px)` }}
                  type="text"
                  readOnly={true}
                  defaultValue={car.alter_imei || ''} />
              </TableCell>

            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>

  )
}




export default CarsLadgeScreen