import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from "@mui/material";
import { useState } from "react";
import { Card, CardActionArea, CardContent, Grid, TextField, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setAuthFlag } from "../../store/slices/userSlice";
import { Input } from '@mui/material';
import PasswordIcon from '@mui/icons-material/Password';



const AuthorizationPage = () => {
  const dispatch = useDispatch();
  const {isAuth} = useSelector(state => state.user);

  const handleEsiaAuth = async (event) => {
    dispatch(setAuthFlag(!isAuth))
  }

  return(
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} md={6}>
        <Card>
          <CardActionArea>
            <CardContent>
              <Grid container>
                <Grid container item xs={12} justifyContent="center" alignItems="center">
                  <Button onClick={handleEsiaAuth}>Авторизоваться через ЕСИА</Button>
                </Grid>
              </Grid>     
            </CardContent>
          </CardActionArea>
        </Card>
        <Card>
          <CardContent>
              <Grid container xs={12} justifyContent="center" alignItems="center" >
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <AccountCircleIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField id="input-with-sx" label="Логин" variant="standard" />
                </Box>
              </Grid>
              <Grid container xs={12} justifyContent="center" alignItems="center" >
                <Box sx={{ display: 'flex', alignItems: 'flex-end', my: 0.5 }}>
                  <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField id="input-with-sx" label="Пароль" variant="standard" type="password"/>
                </Box>
              </Grid>
              <Grid container xs={12} justifyContent="center" alignItems="center" >
                <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 4 }}>
                  <Button variant="contained">Войти</Button>
                </Box>
              </Grid>
              
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AuthorizationPage;