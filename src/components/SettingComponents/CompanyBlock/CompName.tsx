import { FC, useState, useEffect } from "react"

import { Box, Button, Stack } from "@mui/material"
import CreateIcon from '@mui/icons-material/Create';

import { TCompanyData } from "../types/carsSettingsTypes";

import { inputDisableStyle } from "./customStyle";

type TCompNameProps = {
  companyId: string,
  companyName: string
}

const CompName: FC<TCompNameProps> = ({ companyId, companyName }) => {
  return (
    <Stack display={'flex'} flexDirection={'column'}>
      <Stack display={'flex'} flexDirection={'row'} gap={'1rem'}>
        <input
          style={{ ...inputDisableStyle, width: 'calc(10ch + 24px)' }}
          type="text"
          disabled
          defaultValue={companyName}></input>
        <Button
          sx={{
            minWidth: '10px', width: '2rem',
            "& .MuiButton-startIcon": { margin: "auto" }
          }}

          variant="outlined" startIcon={<CreateIcon sx={{ margin: 'auto' }} />}></Button>
      </Stack>
      <Stack>
        <Box>Имя Компании</Box>
      </Stack>
    </Stack>
  )
}
export default CompName