import { FC, useState, useEffect } from "react"

import { Box, Button, Stack } from "@mui/material"
import CreateIcon from '@mui/icons-material/Create';


type TCompNameProps = {
  companyId: string,
  companyName: string
}

const CompName: FC<TCompNameProps> = ({ companyId, companyName }) => {
  return (
    <Stack display={'flex'} flexDirection={'column'}>
      <Stack display={'flex'} flexDirection={'row'} gap={'1rem'}>
        <input
          className="company-block--dis-input"
          style={{
            width: `calc(${companyName.length}ch + 22px)`
          }}
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