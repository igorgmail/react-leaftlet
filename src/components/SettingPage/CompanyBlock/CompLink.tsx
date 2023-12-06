import { FC, useState, useEffect, useRef } from "react"

import { Box, Button, Stack } from "@mui/material"


// Icons
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';


type TCompLinkProps = {
  companyId: string,
  shotLink: string
}


const CompLink: FC<TCompLinkProps> = ({ companyId, shotLink }) => {

  const inputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      // Установка курсора в конец текста
      input.scrollLeft = input.scrollWidth;
      // input.value = shotLink; // Убедитесь, что shotLink загружен или обновлен
      // input.focus();
      // input.blur();
    }
  }, [shotLink]); // Обновление при изменении shotLink

  return (
    <Stack display={'flex'} flexDirection={'column'} >

      <Stack display={'flex'} flexDirection={'row'} gap={'0.5rem'}>
        <Stack>

        <input
            style={{ width: '80%' }}
            ref={inputRef}
          className="company-block--dis-input"
          // style={inputDisableStyle}
          type="text"
          disabled
          defaultValue={shotLink} />
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
        <Stack>
          <Button
            sx={{
              minWidth: '10px', width: '2rem',
              "& .MuiButton-startIcon": { margin: "auto" }
            }}
            variant="outlined"
            startIcon={<AutoFixHighIcon sx={{ margin: 'auto' }} />}></Button>
        </Stack>
        <Stack>
          <Button
            sx={{
              minWidth: '10px', width: '2rem',
              "& .MuiButton-startIcon": { margin: "auto" }
            }}
            variant="outlined"
            startIcon={<ContentCopyIcon sx={{ margin: 'auto' }} />}></Button>
        </Stack>
        <Stack>
          <Button
            sx={{
              minWidth: '10px', width: '2rem',
              "& .MuiButton-startIcon": { margin: "auto" }
            }}
            variant="outlined"
            startIcon={<ClearIcon sx={{ margin: 'auto' }} />}></Button>
        </Stack>
      </Stack>

      <Stack>
        <Box>Короткая ссылка</Box>
      </Stack>

    </Stack>
  )
}
export default CompLink