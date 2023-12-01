import { useState, useEffect } from "react"

import { Container, Stack } from "@mui/material"
import CarsBlock from "./CarsBlock"
import ControlPointBlock from "./ControlPointBlock"
import EventsBlock from "./EventsBlock"
import CompanyBlock from "./CompanyBlock"


import { mockData } from "./mockData"

const companyData = mockData.company

const SettingForm = () => {
  return (
    <Stack display={'flex'} margin={'auto'} mt={'2rem'}
    // sx={{ width: { xs: "90%", sm: "90%", md: "60%" }, }}
    >
      <CompanyBlock companyData={companyData}></CompanyBlock>
      <CarsBlock></CarsBlock>
      <ControlPointBlock></ControlPointBlock>
      <EventsBlock></EventsBlock>
    </Stack>
  )
}
export default SettingForm