import React from "react"

import { Stack } from "@mui/material"


import ModalWrap from "../../components/ModalWrap";

import AddCarForm from "./AddCarForm";


const AddCarModal = () => {
  console.log("--Render Modal AddCar");

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const handleFormSubmit = () => {

  }


  return (

    <Stack display={'flex'} flexDirection={'row'} justifyContent={'flex-start'}
      sx={{ width: '80%' }}
    >

      <ModalWrap modalTitle={'Добавление Автомобиля'} open={open} setOpen={setOpen}>

        <AddCarForm handleClose={handleClose} handleFormSubmit={handleFormSubmit} />

      </ModalWrap>


    </Stack >

  );
}

export default AddCarModal;