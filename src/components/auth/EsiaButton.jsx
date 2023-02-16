import axios from 'axios';
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Alert from '@mui/material/Alert';

const EsiaButton = ({authUrl, esiaUrlReady, esiaUrlError}) => {

  const handleEsiaAuth = () => {
    // console.log(authUrl)
    window.location.assign(authUrl);
  }

  return(
    <>
      <Button onClick={handleEsiaAuth} disabled={esiaUrlReady ? false : true}>Авторизоваться через ЕСИА</Button>
      {
      esiaUrlError
        ? <Alert severity="error">Авторизация ЕСИА сломалася... &#128554;</Alert>
        : false
      }
      {/* <a href={authUrl}>{esiaUrlReady ? 'AUTH ESIA GO' : 'NO'}</a> */}
    </>
  )
}

export default EsiaButton;