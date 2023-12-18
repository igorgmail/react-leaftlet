import { useState, useEffect } from "react"

import { Backdrop, Stack } from "@mui/material"
import CarsBlock from "./CarsBlock/CarsBlock"
import ControlPointBlock from "./ControlPointBlock/ControlPointBlock"
import EventBlock from "./EventBlock/EventBlock"
import CompanyBlock from "./CompanyBlock/CompanyBlock"
import UserBlock from "./UsersBlock/UserBlock"
import { useAppDispatch, carsSettingsActions, useAppSelector, store } from '../../store';

import { mockUserData } from "./mockData"
import { Spinner } from "./components/Spinner"
import Loader from "./components/Loader/Loader"
import PreloadImages from "./components/PreloadImage"

import { IRequestOptions, ISettingsData } from "./types/carsSettingsTypes"
import API_ENDPOINTS from "./utils/apiEndpoints"
import useApi from './hooks/useApi'
import useAlert from "./hooks/useAlert"
import useUpdateData from "./hooks/useUpdateData"

import OutsideClickListener from "./OutsideClickListener "

const SettingForm = () => {
  console.log("--Render Setting Form");


  const [settingsData, setSettingsData] = useState<ISettingsData>()
  const [updateForm, setUpdateForm] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const { sendRequest } = useApi()
  const { showAlert, alertComponent } = useAlert()
  // const { updateDataRequest } = useUpdateData()


  const getDataFromServer = async () => {
    const requestOptions: IRequestOptions = {
      method: 'GET',
    };
    const response = await sendRequest(API_ENDPOINTS.GET_SETTINGS, requestOptions)
    if (response.error) {
      console.warn("Error in get settings", response.error);
      showAlert('Не удалось получить данные с сервера', 'error');
      return
    }
    if (response) {
      dispatch(carsSettingsActions.setInitialSettingsData(response.data))
      setSettingsData(response.data)
    }
  };

  useEffect(() => {
    getDataFromServer()
  }, [updateForm])

  return (
    settingsData ?
    <Stack display={'flex'} margin={'auto'} mt={'2rem'} mb={'2rem'}
      sx={{ width: { sm: "90%", md: "70%" }, }}
      >
        <OutsideClickListener setUpdateForm={setUpdateForm} />
        <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
          <CompanyBlock key={'company'}></CompanyBlock>
          <CarsBlock key={'cars'}></CarsBlock>
          <ControlPointBlock key={'control'}></ControlPointBlock>
          <EventBlock key={'events'}></EventBlock>
          <UserBlock key={'users'}></UserBlock>
        <PreloadImages iconsUrls={settingsData.icons} />

      {alertComponent}
    </Stack>

      :
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
      >
        <Loader />
      </Backdrop>

  )
}
export default SettingForm
