import { FC, useState, useEffect } from "react"

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
  const companyId = useAppSelector((store) => store.carsSettings.company.company_id)

  const [readonlyName, setReadolyName] = useState(true)
  const [compName, setCompName] = useState(companyName)
  const { sendRequest } = useApi();
  const { showAlert, alertComponent } = useAlert();
  const dispatch = useAppDispatch()

  const handlerEditorButton = () => {
    setReadolyName(false)
  }

  const handlerSaveName = () => {
    setReadolyName(true)
    submitData()
    dispatch(carsSettingsActions.setRequestWorks(true))
  }

  const handlerNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setCompName((cur) => cur = value)
  }

  const submitData = async () => {
    const requestOptions: IRequestOptions = {
      method: 'POST',
      body: JSON.stringify({
        company_name: compName,
        company_id: companyId
      }),
    };

    const response = await sendRequest(API_ENDPOINTS.SAVE_COMPANY_NAME, requestOptions)

    if (response.error) {
      console.warn("Error in save company name", response.error);
      showAlert('Имя компании не изменено', 'error');
      dispatch(carsSettingsActions.setRefreshCompanyData())
      setCompName(companyName)
      return
    }
    if (response) {
      const { company_name } = response.data
      showAlert('Имя компании изменено успешно', 'success');
      setCompName(company_name)
      dispatch(carsSettingsActions.setCompanyName(company_name))
    }
  };

  return (
    <>

      <Stack display={'flex'}
        flexDirection={'column'}
      // sx={{ opacity: '0.5' }}
      >
      <Stack display={'flex'} flexDirection={'row'} gap={'1rem'}>
        <input
            className={readonlyName ? "company-block--dis-input" : 'company-block--name-active-input'}
            onChange={(e) => handlerNameInput(e)}
          style={{
            width: `calc(${compName.length}ch + 22px)`
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
                onClick={handlerEditorButton}
                sx={{ margin: 'auto' }}
              />
              : <CheckRoundedIcon
                onClick={handlerSaveName}
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