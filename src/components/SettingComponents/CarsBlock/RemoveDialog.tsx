import React, { FC, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import ClearIcon from '@mui/icons-material/Clear';

import { ICarObject } from "../types/carsSettingsTypes";
import { Stack } from '@mui/material';

type TRemoveDialogProps = {
  getApprove: (arg: boolean) => void,
  carData: ICarObject
}

const RemoveDialog: FC<TRemoveDialogProps> = ({ getApprove, carData }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e: any) => {
    setOpen(false);
    // getApprove(e);
  };

  const handleAgree = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    console.log("Выбран автомобиль с ID:", target.dataset.carid);
    setOpen(false);
  }

  return (
    <>
      <Button
        onClick={handleClickOpen}
        // data-CarId={carData.car_id}
        sx={{
          minWidth: '10px', width: '2rem',
          "& .MuiButton-startIcon": { margin: "auto" }
        }}
        // variant="outlined"
        startIcon={<ClearIcon sx={{ marginLeft: '0' }} />}></Button>
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Удаление !!!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p>Подтвердите удаление</p>
            <p>{carData.name}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions >
          <Stack display={'flex'} flexDirection={'row'} justifyContent={'space-between'}
            sx={{ width: '100%' }}
          >
            <Button
              data-carid={carData.car_id}
              onClick={(e: any) => handleAgree(e)}
            >Согласен</Button>
            <Button onClick={(e: any) => handleClose(false)} autoFocus>
              Отмена
            </Button>
          </Stack>

        </DialogActions>
      </Dialog >
    </>
  );
}

export default RemoveDialog