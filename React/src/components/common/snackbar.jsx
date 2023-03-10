import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Snackbars({severity, message, setSuccess, setError}) {
    const [open, setOpen] = React.useState(true);

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
      
      setSuccess && setSuccess({ isSuccess: false, message: "" });
      setError &&  setError({ isError: false, message: "" });
    };
  

  return (
    <Stack spacing={2} sx={{ width: '100%' }} >
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}