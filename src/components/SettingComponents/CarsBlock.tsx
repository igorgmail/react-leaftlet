import { useState, useEffect } from "react"

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, Stack, Box } from "@mui/material"
const cars = [
  {
    car_id: "1",
    name: "VW Passat",
    pic: "http://89.108.99.163/pics/car1.png",
    imei: "350612070317373",
    imei_2: null
  },
  {
    car_id: "2",
    name: "Renault Master",
    pic: "http://89.108.99.163/pics/car2.png",
    imei: "333",
    imei_2: "444"
  },
  {
    car_id: "33",
    name: "Ларгус Иванов",
    pic: "http://89.108.99.163/pics/car3.png",
    imei: "eeer",
    imei_2: null
  }
];

const companyData = {
  company_id: "1",
  name: "Компания АБС",
  short_link: "http://89.108.99.163/~HA9D4KXLWG"
};

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),

];
const styleHead = { borderBottom: 'none', padding: '0 1rem 8px', color: 'white', }
const styleCell = { padding: '0 1rem' }
const CarsBlock = () => {
  return (
    <Stack fontFamily={'Roboto, sans-serif'}>

      <TableContainer component={Paper} sx={{ borderRadius: '10px' }}>
        <Table
          // sx={{ minWidth: 650 }} 
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
            {cars.map((car) => (
              <TableRow
                key={car.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >

                <TableCell component="th" scope="row" sx={styleCell}>
                  {car.name}
                </TableCell>

                <TableCell align="center" sx={styleCell}>
                  <Box width={'40px'} margin={'auto'}>
                    <img src={car.pic}
                      style={{ transform: 'rotate(90deg)', width: '20px', height: '40px' }}
                      alt="Иконка авто"></img>
                  </Box>
                </TableCell>

                <TableCell align="left" sx={styleCell}>{car.imei}</TableCell>
                <TableCell align="left" sx={styleCell}>{car.imei_2}</TableCell>

              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>


    </Stack >
  )
}
export default CarsBlock




