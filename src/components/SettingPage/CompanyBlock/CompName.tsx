import { useState, useRef } from "react"

import { useAppDispatch, useAppSelector, carsSettingsActions } from "../../../store";
import useApi from "../hooks/useApi";
import useAlert from "../hooks/useAlert";
import API_ENDPOINTS from "../utils/apiEndpoints";

import { Box, Button, Stack } from "@mui/material"
// Icon
import CreateIcon from '@mui/icons-material/Create';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { IRequestOptions } from "../types/carsSettingsTypes";
import React from "react";


const CompName = () => {
  console.log("--Render CompanyName");

  const companyName = useAppSelector((store) => store.carsSettings.company.name)

  const [readonlyName, setReadolyName] = useState(true)
  const [compName, setCompName] = useState(companyName)

  const nameInputRef = useRef<HTMLInputElement>(null)
  const { sendRequest } = useApi();
  const { showAlert, alertComponent } = useAlert();
  const dispatch = useAppDispatch()

  const handleEditorButton = () => {
    setReadolyName(false)
    nameInputRef.current?.focus()
  }

  const handleSaveName = () => {
    setReadolyName(true)
    submitData()
    dispatch(carsSettingsActions.setRequestWorks(true))
  }

  const handleNameInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.value
    setCompName((cur) => cur = value)
  }

  const submitData = async () => {
    const requestOptions: IRequestOptions = {
      method: 'GET',
    };

    const response = await sendRequest(API_ENDPOINTS.SAVE_COMPANY_NAME + `?company_name=${compName}`, requestOptions)

    if (response.data.status === 'error') {
      console.warn("Error in save company name", response.data.message);
      showAlert('Имя компании не изменено', 'error');
      dispatch(carsSettingsActions.setRefreshCompanyData())
      setCompName(companyName)
      return
    }
    if (response.data.status === 'Ok') {

      showAlert('Имя компании изменено успешно', 'success');
      setCompName(compName)
      dispatch(carsSettingsActions.setCompanyName(compName))
      return
    }
    showAlert('Имя компании не изменено', 'error');
    dispatch(carsSettingsActions.setRefreshCompanyData())
    setCompName(companyName)
  };

  return (
    <>

      <Stack display={'flex'}
        flexDirection={'column'}
      >
      <Stack display={'flex'} flexDirection={'row'} gap={'1rem'}>
        <input
            className={readonlyName ? "company-block--dis-input" : 'company-block--name-active-input'}
            onChange={(e) => handleNameInput(e)}
            ref={nameInputRef}
          style={{
            width: `calc(${compName.length}ch + 32px)`
          }}
          type="text"
            readOnly={readonlyName}
            value={compName}>
          </input>

        <Button
          sx={{
            minWidth: '10px', width: '2rem',
            "& .MuiButton-startIcon": { margin: "auto" }
          }}
            variant="outlined"
            startIcon=
            {readonlyName ?
              <CreateIcon
                onClick={handleEditorButton}
                sx={{ margin: 'auto' }}
              />
              : <CheckRoundedIcon
                onClick={handleSaveName}
              />}
          >
          </Button>
      </Stack>
      <Stack>
        <Box>Имя Компании</Box>
      </Stack>
    </Stack>
      {alertComponent}
    </>

  )
}

export default CompName