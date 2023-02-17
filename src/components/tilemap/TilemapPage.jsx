import TileMap from "../diagrams/Tilemap";
import { setCurrentMo } from "../../store/slices/moListSlice";
import { Grid, Autocomplete, TextField, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TilemapFilter from "./TilemapFilter";
import dateConverter from "../../utils/dateConverter";
import Snackbar from '../../components/indicator_pages/indicator_helpers/Snackbar';
import Stack from '@mui/material/Stack';

const TilemapPage = ({clear}) => {
  const [currentIndicator, setCurrentIndicator] = useState({
    label: 'Запись ко врачу', id: 1,
  });

  const {isLoading, isAuth, userData} = useSelector(state => state.user);
  const {mapDate} = useSelector(state => state.diagramDates)

  const [isSnackAuth, setIsSnackAuth] = useState(false);
  const [isSnackAppointments, setIsSnackAppointments] = useState(false)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSnackAuth(false);
  };

  useEffect(() => {
    if (userData.auth_token) {
      setIsSnackAuth(true);
      setTimeout(() => {
        setIsSnackAuth(false);
      }, 5000)
    }
  }, [userData.auth_token])

  return(
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <TilemapFilter currentIndicator={currentIndicator} setCurrentIndicator={setCurrentIndicator}/>
      </Grid>
      <Grid item xs={12} container justifyContent="center" alignItems="center">
        <div className="highcharts-tilemap">
          <TileMap clear={clear} setCurrentMo={setCurrentMo} indicator={currentIndicator.id} isSnack={isSnackAppointments} setIsSnack={setIsSnackAppointments}/>
        </div>
      </Grid>
      <Stack spacing={2}>
        <Snackbar mustBeOpen={isSnackAuth} snackText={`Вы вошли ${userData.firstName} ${userData.lastName}`}/>
        <Snackbar mustBeOpen={isSnackAppointments} snackText={`Нет данных на ${dateConverter.dateToStrForRequest(mapDate)}`}/>
      </Stack>
    </Grid>
  )
}

export default TilemapPage;