import { useState, useEffect, FC, useCallback } from "react"

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Fab, Stack, Box, Typography, Grid, Divider, Fade, Modal } from "@mui/material"

// Icons
import AddIcon from '@mui/icons-material/Add';

import { ICarObject } from "../types/carsSettingsTypes";
import AddCarModal from "./AddCarModal";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Backdrop from '@mui/material/Backdrop'





const AddCar = () => {
  console.log("--Render AddCarIcon");


  return (
    <Stack display={'flex'} flexDirection={'row'} justifyContent={'flex-start'}>
      <AddCarModal />
    </Stack >
  )
}
export default AddCar