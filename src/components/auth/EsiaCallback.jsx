import axios from 'axios';
import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthFlag } from '../../store/slices/userSlice';
import { loginEsia } from '../../store/slices/ActionCreators';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { Link, Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';

const EsiaCallback = () => {
  const [code, setCode] = useState(null);
  const [state, setState] = useState(null);
  const [errorTimeout, setErrorTimeout] = useState(false);

  const {isAuth, isLoading, userData, error} = useSelector(state => state.user);
  const dispatch = useDispatch();


  useEffect(() => {
    const code = (window.location.search.match(/code=([^&]+)/) || [])[1];
    const state = (window.location.search.match(/state=([^&]+)/) || [])[1];

    setCode(code)
    setState(state)

    if (!isLoading && !error) {
      if (code && state) {
        const reqData = {
          code,
          state
        }
  
        dispatch(loginEsia(reqData))
      }
    }

    // const qParams = [
    //   `code=${code}`,
    //   // `redirect_uri=${
    //   // state === "google" ? Google.REDIRECT_URI : Azure.REDIRECT_URI
    //   // }`,
    //   // `scope=${state === "google" ? Google.SCOPE : Azure.SCOPE}`
    // ].join("&");
    // fetch(`/api/auth-from-code/${state}?${qParams}`, {
    //   credentials: "include"
    // })
    //   .then(res => res.json())
    //   .then(res => console.log(res))
    //   .catch(console.error);

  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setErrorTimeout(true);
      }, 5000)
    }
  }, [error])

  return(
    <Container>
      {/* your code is <br />{code} <br /> your state is <br />{state} <br /> <br /> isAuth = {isAuth ? 'true' : 'false'} */}
        {
          isLoading
          ?     
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '10px'}}>
            {/* <Typography>
              Идет авторизация...
            </Typography> */}
            <CircularProgress />
          </Box>
          : false
        }
        {
          error
          ? <>
              {
              errorTimeout
                ? <Navigate to='/auth' replace />
                : <Alert severity="error">{error}</Alert>
              }
            </>
          : false
        }
    </Container>

  )
}

export default EsiaCallback;