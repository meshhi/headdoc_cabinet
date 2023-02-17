import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "@mui/material";
import Alert from '@mui/material/Alert';
import { getEsiaUrl } from '../../store/slices/ActionCreators';

const EsiaButton = () => {
  const dispatch = useDispatch();
  const {isLoading, error, esiaUrl, esiaError} = useSelector(state => state.user);

  const handleEsiaAuth = () => {
    dispatch(getEsiaUrl());
  }

  useEffect(() => {
    if (esiaUrl) {
      window.location.assign(esiaUrl);
    }
  }, [esiaUrl])

  return(
    <>
    
      <Button onClick={handleEsiaAuth} disabled={isLoading ? true : false}>Авторизоваться через ЕСИА</Button>
      {
      esiaError
        ? <Alert severity="error">Авторизация ЕСИА сломалася... &#128554;</Alert>
        : false
      }
      {/* <a href={authUrl}>{esiaUrlReady ? 'AUTH ESIA GO' : 'NO'}</a> */}
    </>
  )
}

export default EsiaButton;