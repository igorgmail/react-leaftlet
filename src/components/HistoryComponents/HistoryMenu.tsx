import * as React from 'react';
import { IconButton, Menu, MenuItem, Typography, Divider, Stack, Button } from '@mui/material/';
import { IconHistory } from './IconHistory';

const HistoryMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        onClick={handleClick}
        size="small"
        // sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <IconHistory />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Stack display={'flex'} justifyContent={'center'} alignItems={'center'}>

          <Typography variant="h6">История</Typography>
        </Stack>
        <Divider />
        <MenuItem onClick={handleClose}>Дата Время от :</MenuItem>
        <MenuItem onClick={handleClose}>Дата Время до :</MenuItem>
        <Divider />
        <Stack>
          <Button variant="outlined" style={{ width: '60%', margin: 'auto' }}>Показать</Button>
        </Stack>
      </Menu>
    </div>
  );
}


export { HistoryMenu }