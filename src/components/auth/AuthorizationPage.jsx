import { Button } from "@mui/material";
import { useState } from "react";
import { Card, CardActionArea, CardContent, Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setAuthFlag } from "../../store/slices/userSlice";


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
      </Grid>
    </Grid>
  )
}

export default AuthorizationPage;