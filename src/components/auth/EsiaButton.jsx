import axios from 'axios';
import { useState, useEffect } from "react";
import { Button } from "@mui/material";

const EsiaButton = ({authUrl, esiaUrlReady}) => {

  const handleEsiaAuth = () => {
    // console.log(authUrl)
    window.location.assign(authUrl);
  }

  return(
    <>
      <Button onClick={handleEsiaAuth} disabled={esiaUrlReady ? false : true}>Авторизоваться через ЕСИА</Button>
      {/* <a href={authUrl}>{esiaUrlReady ? 'AUTH ESIA GO' : 'NO'}</a> */}
    </>
  )
}

export default EsiaButton;