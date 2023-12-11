import React, { useState, useEffect, FC } from "react"

import { Fab, Box, Typography, Modal, Fade, Stack, Grid, Button, TextField, IconButton } from "@mui/material"

// Icons
import AddIcon from '@mui/icons-material/Add';

import Backdrop from '@mui/material/Backdrop';
import ModalWrap from "../../components/ModalWrap";
import AddPointForm from "./AddPointForm";

type TAddCarModalProps = {
  // open: boolean,
  // // setOpen: (a: boolean) => void,
  // handleClose: () => void
}

const AddPointModal = () => {
  console.log("--Render Modal Add Point");

  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);
  const handleFormSubmit = () => {

  }

  return (

    <Stack display={'flex'} flexDirection={'row'} justifyContent={'flex-start'}
      sx={{ width: '80%' }}
    >

      <ModalWrap modalTitle={'Добавление Контрольной точки'} open={open} setOpen={setOpen}>

        <AddPointForm handleClose={handleClose} handleFormSubmit={handleFormSubmit} />

      </ModalWrap>


    </Stack >

  );

}
export default AddPointModal