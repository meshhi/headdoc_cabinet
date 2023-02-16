import { useOAuth2 } from "@tasoskakour/react-use-oauth2";
import axios from 'axios';
import { useState, useEffect } from "react";
import { Button } from "@mui/material";


const EsiaButton = ({authUrl, esiaUrlReady}) => {

  const { data, loading, error, getAuth } = useOAuth2({
    authorizeUrl: authUrl,
    // authorizeUrl: 'https://www.google.com/',
    clientId: "YOUR_CLIENT_ID",
    redirectUri: `${document.location.origin}/callback`,
    scope: "YOUR_SCOPES",
    responseType: "code",
    exchangeCodeForTokenServerURL: "https://your-backend/token",
    exchangeCodeForTokenMethod: "POST",
    onSuccess: (payload) => console.log("Success", payload),
    onError: (error_) => console.log("Error", error_)
  });

  const handleEsiaAuth = () => {
    getAuth();
    console.log(authUrl)
  }

  return(
    <>
    
      <Button onClick={handleEsiaAuth} disabled={esiaUrlReady ? false : true}>Авторизоваться через ЕСИА</Button>
      {
        loading ? 'esia loading' : false
      }
      {
        error ? 'esia error' : false
      }
      <a href={authUrl}>{esiaUrlReady ? 'AUTH ESIA GO' : 'NO'}</a>
    </>
  )
}

export default EsiaButton;