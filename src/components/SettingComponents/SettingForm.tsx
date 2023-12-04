import { useState, useEffect } from "react"

import { Container, Stack } from "@mui/material"
import CarsBlock from "./CarsBlock/CarsBlock"
import ControlPointBlock from "./ControlPointBlock"
import EventsBlock from "./EventsBlock"
import CompanyBlock from "./CompanyBlock/CompanyBlock"


import { mockData } from "./mockData"

const companyData = mockData.company
const carsData = mockData.cars
const controlPointData = mockData.points // Контрольные точки
const eventsData = mockData.events // События
const typeOfEventsData = mockData.type_of_events // Типы события  [ "IN", "OUT"]
const iconsData = mockData.icons // {icon_id: " ",url: " "}


const SettingForm = () => {
  console.log("--Render Setting Form");

  return (
    <Stack display={'flex'} margin={'auto'} mt={'2rem'}
      sx={{ width: { sm: "90%", md: "70%" }, }}
    >
      <CompanyBlock companyData={companyData}></CompanyBlock>
      <CarsBlock carsData={carsData}></CarsBlock>
      <ControlPointBlock pointData={controlPointData}></ControlPointBlock>
      <EventsBlock eventsData={eventsData}></EventsBlock>
    </Stack>
  )
}
export default SettingForm