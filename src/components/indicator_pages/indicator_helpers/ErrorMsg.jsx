import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const ErrorMsg = ({errorTitle, errorContent}) => {
  return(
    <Alert severity="error">
      <AlertTitle>{errorTitle}</AlertTitle>
        {errorContent}
    </Alert>
  )
}

export default ErrorMsg;