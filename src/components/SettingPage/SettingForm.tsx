import { useState, useEffect, useMemo } from "react"

import { Alert, AlertTitle, Container, Stack } from "@mui/material"
import CarsBlock from "./CarsBlock/CarsBlock"
import ControlPointBlock from "./ControlPointBlock/ControlPointBlock"
import EventBlock from "./EventBlock/EventBlock"
import CompanyBlock from "./CompanyBlock/CompanyBlock"
import UserBlock from "./UsersBlock/UserBlock"
import { useAppDispatch, useAppSelector, carsSettingsActions } from '../../store';

import { mockUserData, imitationFetchMockData } from "./mockData"
import { Spinner } from "./components/Spinner"

import { ISettingsData } from "./types/carsSettingsTypes"



const SettingForm = () => {
  console.log("--Render Setting Form");


  const [settingsData, setSettingsData] = useState<ISettingsData>()
  const dispatch = useAppDispatch()
  // const carsSettingsData = useAppSelector((state) => state.carsMap.carsMapConfig.variant);


  // const companyData = settingsData?.company
  // const carsData = useMemo(() => settingsData.cars, [settingsData.cars]) // Автомобили
  // const controlPointData = settingsData.points // Контрольные точки
  // const eventsData = settingsData.events // События
  // const typeOfEventsData = settingsData.type_of_events // Типы события  [ "IN", "OUT"]
  // const iconsData = settingsData.icons // {icon_id: " ",url: " "}


  useEffect(() => {
    imitationFetchMockData().then((data) => {
      setSettingsData(data)
      return data
    }).then((data) => dispatch(carsSettingsActions.setInitialSettingsData(data)))
  }, [dispatch])



  return (
    <Stack display={'flex'} margin={'auto'} mt={'2rem'} mb={'2rem'}
      sx={{ width: { sm: "90%", md: "70%" }, }}
    >
      {settingsData ? (
        <>
          <CompanyBlock key={'company'}></CompanyBlock>
          <CarsBlock key={'cars'}></CarsBlock>
          <ControlPointBlock pointData={settingsData.points} key={'control'}></ControlPointBlock>
          <EventBlock eventsData={settingsData.events} key={'events'}></EventBlock>
          <UserBlock usersData={mockUserData.users}></UserBlock>

        </>

      ) : <Spinner />}

    </Stack>
  )
}
export default SettingForm