import React, { FC, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import ClearIcon from '@mui/icons-material/Clear';

import { handlerRemoveDialog } from '../utils/handlerRemoveDialog';

import { ICarObject, TRemoveDialogCallback } from "../types/carsSettingsTypes";
import { Stack } from '@mui/material';


type TRemoveDialogProps = {
  callback: (dialogEvent: TRemoveDialogCallback) => void,
  eventData: {
    event: string,
    subjectid: string,
    msg: string
  }
}


const RemoveDialog: FC<TRemoveDialogProps> = ({ callback, eventData }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e: any) => {
    setOpen(false);
  };

  const handleAgree = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    const { event, subjectid } = target.dataset
    const dialogEvent = { event, subjectid }
    if (event && subjectid) callback(dialogEvent)
    setOpen(false);
  }

  return (
    <>
      <Button
        onClick={handleClickOpen}
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

          <div dangerouslySetInnerHTML={{ __html: eventData.msg }} className='dialog-modal--content'></div>

        </DialogContent>
        <DialogActions >
          <Stack display={'flex'} flexDirection={'row'} justifyContent={'space-between'}
            sx={{ width: '100%' }}
          >
            <Button
              data-event={eventData.event}
              data-subjectid={eventData.subjectid}
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