import { useState, useEffect, FC, useCallback } from "react"

import { Stack } from "@mui/material"

import AddCarModal from "./AddCarModal";

const AddCar = () => {
  console.log("--Render AddCarIcon");


  return (
    <Stack display={'flex'} flexDirection={'row'} justifyContent={'flex-start'}>
      <AddCarModal />
    </Stack >
  )
}
export default AddCar