import { FC, useState, useEffect } from "react"

import { Box, Button, Stack } from "@mui/material"

import useApi from "../hooks/useApi";
import useAlert from "../hooks/useAlert";

import API_ENDPOINTS from "../utils/apiEndpoints";

import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useAppDispatch, useAppSelector, carsSettingsActions } from "../../../store";
import { IRequestOptions } from "../types/carsSettingsTypes";



const CompBalance = () => {
  console.log("--Render CompanyBalance");


  const companyBalance = useAppSelector((store) => store.carsSettings.company.balance)
  const companyId = useAppSelector((store) => store.carsSettings.company.company_id)

  const [compBalance, setCompBalance] = useState(companyBalance)
  const { sendRequest } = useApi();
  const { showAlert, alertComponent } = useAlert();

  const dispatch = useAppDispatch()


  const handleUpdateBalance = async () => {

    const requestOptions: IRequestOptions = {
      method: 'GET',
      body: JSON.stringify({
        company_id: companyId
      }),
    };

    const response = await sendRequest(API_ENDPOINTS.REFRESH_BALANCE, requestOptions)

    if (response.error) {
      console.warn("Error in refresh balance", response.error);
      showAlert('Не удалось обновить баланс', 'error');
      dispatch(carsSettingsActions.setRefreshCompanyData())
      setCompBalance(companyBalance)
      return
    }
    if (response) {
      const { balance } = response.data
      showAlert('Баланс компании обновлен', 'success');
      setCompBalance(balance)
      dispatch(carsSettingsActions.setBalance(balance))
    }

  }

  return (
    <Stack display={'flex'} flexDirection={'column'}>

      <Stack display={'flex'} flexDirection={'row'} gap={'0.5rem'}>
        <input
          className="company-block--dis-input"
          style={{
            width: `calc(${compBalance.length}ch + 20px)`
          }}
          type="text"
          disabled
          defaultValue={compBalance}>
        </input>
        <Stack display={'flex'} flexDirection={'row'} alignItems={'center'}>
          RUB
        </Stack>
        <Stack>
          <Button
            onClick={() => handleUpdateBalance()}
            sx={{
              minWidth: '10px', width: '2rem',
              "& .MuiButton-startIcon": { margin: "auto" }
            }}
            variant="outlined"
            startIcon={<AutorenewIcon sx={{ margin: 'auto' }} />}></Button>
        </Stack>
      </Stack>

      <Stack>
        <Box>Баланс</Box>
      </Stack>
      {alertComponent}
    </Stack>
  )
}
export default CompBalance