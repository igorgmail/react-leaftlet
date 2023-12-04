import { FC, useState, useEffect } from "react"

import { Box, Button, Stack } from "@mui/material"
import CreateIcon from '@mui/icons-material/Create';

import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AutorenewIcon from '@mui/icons-material/Autorenew';

import { TCompanyData } from "../types/carsSettingsTypes";

import { inputDisableStyle } from "./customStyle";

type TCompBalanceProps = {
  companyId: string,
  balance: string
}




const CompBalance: FC<TCompBalanceProps> = ({ companyId, balance }) => {
  return (
    <Stack display={'flex'} flexDirection={'column'}>

      <Stack display={'flex'} flexDirection={'row'} gap={'0.5rem'}>
        <input
          style={{ ...inputDisableStyle, width: `calc(${balance.length}ch + 20px)` }}
          type="text"
          disabled
          defaultValue={balance}>
        </input>
        <Stack display={'flex'} flexDirection={'row'} alignItems={'center'}>
          RUB
        </Stack>
        <Stack>
          <Button
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

    </Stack>
  )
}
export default CompBalance