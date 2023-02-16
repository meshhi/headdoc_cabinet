import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { Card, CardActionArea, CardContent, Grid, TextField, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setAuthFlag } from "../../store/slices/userSlice";
import { Input } from '@mui/material';
import PasswordIcon from '@mui/icons-material/Password';
import { login } from '../../store/slices/ActionCreators';
import EsiaButton from './EsiaButton';
import axios from 'axios';

const AuthorizationPage = () => {

  const dispatch = useDispatch();
  const {isAuth} = useSelector(state => state.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [authUrl, setAuthUrl] = useState();
  const [esiaUrlReady, setEsiaUrlReady] = useState(false);
  const [esiaUrlError, setEsiaUrlError] = useState(true);

  const handleLogin = (event) => {
    const reqData = {
      username,
      password
    }

    dispatch(login(reqData))
  }

  const handleLoginInputChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordInputChange = (event) => {
    setPassword(event.target.value);
  }

  const getEsiaUrl = async() => {
    try {
      let response = await axios.get('http://10.1.3.109:8000/esia_login/login');
      const authorizeUrl = response.data;
      console.log(authorizeUrl);
      setAuthUrl(authorizeUrl);
      setEsiaUrlReady(true);
      setEsiaUrlError(false)
    } catch(e) {
      setEsiaUrlReady(false);
      setEsiaUrlError(true)
    }
  };

  useEffect(() => {
    getEsiaUrl();
  }, [])

  return(
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} md={6}>
        <Card>
          <CardActionArea>
            <CardContent>
              <Grid container>
                <Grid container item xs={12} justifyContent="center" alignItems="center">
                  <EsiaButton authUrl={authUrl} esiaUrlReady={esiaUrlReady} esiaUrlError={esiaUrlError}></EsiaButton>
                </Grid>
              </Grid>     
            </CardContent>
          </CardActionArea>
        </Card>
        <Card>
          <CardContent>
            <Grid container item xs={12} justifyContent="center" alignItems="center" >
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AccountCircleIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx" label="Логин" variant="standard" onChange={handleLoginInputChange}/>
              </Box>
            </Grid>
            <Grid container item xs={12} justifyContent="center" alignItems="center" >
              <Box sx={{ display: 'flex', alignItems: 'flex-end', my: 0.5 }}>
                <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx" label="Пароль" variant="standard" type="password" onChange={handlePasswordInputChange}/>
              </Box>
            </Grid>
            <Grid container item xs={12} justifyContent="center" alignItems="center" >
              <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 4 }}>
                <Button variant="contained" onClick={handleLogin}>Войти</Button>
              </Box>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AuthorizationPage;