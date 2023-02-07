import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const NoDataMsg = ({errorTitle, errorContent}) => {
  return(
    <Alert severity="warning">
      <AlertTitle>{errorTitle}</AlertTitle>
        {errorContent}
    </Alert>
  )
}

export default NoDataMsg;