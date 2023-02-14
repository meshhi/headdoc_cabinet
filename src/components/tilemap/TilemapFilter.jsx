import { Grid, Autocomplete, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from "react";
import { setMapDate, diagram1SetDate, diagram2SetDate, diagram3SetDate } from "../../store/slices/diagramDatesSlice";
import { useDispatch, useSelector } from "react-redux";
import dateConverter from "../../utils/dateConverter";
import NoDataMsg from '../indicator_pages/indicator_helpers/NoDataMsg'

const TilemapFilter = ({currentIndicator, setCurrentIndicator}) => {
  const dispatch = useDispatch();
  const {mapDate} = useSelector(state => state.diagramDates);
  const {appointments, isLoading, error} = useSelector(state => state.appointments);

  useEffect(() => {
    dispatch(diagram1SetDate(dateConverter.dateStampToNearestMonday(mapDate)))
    dispatch(diagram2SetDate(dateConverter.dateStampToNearestMonday(mapDate)))
    dispatch(diagram3SetDate(dateConverter.dateStampToNearestMonday(mapDate)))
  }, [])

  return(
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={6}>
        <Autocomplete
          disablePortal
          id="combo-box-current-indicator"
          options={[{
            label: 'Запись ко врачу', id: 1,
          },
          {
            label: 'Врачи-СЭМД', id: 2,
          },
          {
            label: 'Межведомственный обмен', id: 3,
          }]}
          getOptionLabel={
            option => option.label
          }
          value={currentIndicator}
          onChange={(event, newValue) => {setCurrentIndicator(newValue)}}
            sx={{ width: '100%' }}
            renderInput={(params) => <TextField
              {...params}
            label="Выберите показатель"
            />}
        />
      </Grid>
      <Grid item xs={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Выберите дату"
            value={mapDate}
            onChange={(newValue) => {
              dispatch(setMapDate(dateConverter.dateStampToNearestMonday(Number(new Date(newValue.$d)))));
              dispatch(diagram1SetDate(dateConverter.dateStampToNearestMonday(Number(new Date(newValue.$d)))))
              dispatch(diagram2SetDate(dateConverter.dateStampToNearestMonday(Number(new Date(newValue.$d)))))
              dispatch(diagram3SetDate(dateConverter.dateStampToNearestMonday(Number(new Date(newValue.$d)))))
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Grid>
    </Grid>
  )
}

export default TilemapFilter;