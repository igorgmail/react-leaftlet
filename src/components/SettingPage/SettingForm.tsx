import { useState, useEffect, useMemo } from "react"

import { Container, Stack } from "@mui/material"
import CarsBlock from "./CarsBlock/CarsBlock"
import ControlPointBlock from "./ControlPointBlock/ControlPointBlock"
import EventBlock from "./EventBlock/EventBlock"
import CompanyBlock from "./CompanyBlock/CompanyBlock"
import UserBlock from "./UsersBlock/UserBlock"
import { useAppDispatch, useAppSelector, carsSettingsActions } from '../../store';

import { mockData } from "./mockData"





const SettingForm = () => {
  console.log("--Render Setting Form");

  const dispatch = useAppDispatch()
  // const carsSettingsData = useAppSelector((state) => state.carsMap.carsMapConfig.variant);


  const companyData = mockData.company
  const carsData = useMemo(() => mockData.cars, [mockData.cars]) // Автомобили
  const controlPointData = mockData.points // Контрольные точки
  const eventsData = mockData.events // События
  const typeOfEventsData = mockData.type_of_events // Типы события  [ "IN", "OUT"]
  const iconsData = mockData.icons // {icon_id: " ",url: " "}


  useEffect(() => {
    dispatch(carsSettingsActions.setInitialSettingsData(mockData))
  }, [])
  return (
    <Stack display={'flex'} margin={'auto'} mt={'2rem'} mb={'2rem'}
      sx={{ width: { sm: "90%", md: "70%" }, }}
    >
      <CompanyBlock companyData={companyData} key={'company'}></CompanyBlock>
      <CarsBlock carsData={carsData} key={'cars'}></CarsBlock>
      <ControlPointBlock pointData={controlPointData} key={'control'}></ControlPointBlock>
      <EventBlock eventsData={eventsData} key={'events'}></EventBlock>
      <UserBlock></UserBlock>
    </Stack>
  )
}
export default SettingForm