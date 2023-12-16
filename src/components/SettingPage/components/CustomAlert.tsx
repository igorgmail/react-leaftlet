import React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

type CustomAlertProps = {
  message?: string;
  severity: 'error' | 'warning' | 'info' | 'success';
};

const CustomAlert: React.FC<CustomAlertProps> = ({ message, severity }) => (
  <Alert
    severity={severity}
    variant="filled"
    icon={<CheckIcon />}
    sx={{ backgroundColor: '#078c75' }}
  >
    {message}
  </Alert>
);

export default CustomAlert;