import React from 'react';

// hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback, useMemo } from "react";

// redux
import { fetchMoList, fetchAppointments } from '../../store/slices/ActionCreators';
import { setCurrentMo } from '../../store/slices/moListSlice';

// components
import Grid from '@mui/material/Grid';
import { Autocomplete } from "@mui/material";
import { CircularProgress } from '@mui/material';
import { TextField } from '@mui/material';
import Tile from './Tile'
import TileModal from "./TileModal";
import TileSkeleton from "./TileSkeleton";
// tile pages
import AppointmentsPage from "../indicator_pages/AppointmentsPage";
import DoctorsSemdPage from "../indicator_pages/DoctorsSemdPage";
import SemdsMSPage from "../indicator_pages/SemdsMSPage";
import { diagram1SetDate, diagram2SetDate, diagram3SetDate } from "../../store/slices/diagramDatesSlice";
import dateConverter from '../../utils/dateConverter';
import AppointmentsDetails from '../indicator_details/AppointmentsDetails';
import DoctorsSemdDetails from '../indicator_details/DoctorsSemdDetails';
import SemdsMSDetails from '../indicator_details/SemdsMSDetails';
import ErrorMsg from '../indicator_pages/indicator_helpers/ErrorMsg';


export const TilesPage = () => {
  // clear credentials watermark on all highcharts diagrams
  const clearHighchartsCredentials = useCallback(() => {
    document.querySelectorAll('.highcharts-credits').forEach((chartCredentials) => chartCredentials.style.display = 'none');
  });

  //initiate data settings got from redux
  const dispatch = useDispatch();
  const {moList, isLoading, error} = useSelector(state => state.moList);
  const currentMo = useSelector(state => {
    const currentMoId = state.moList.currentMoId;
    const currentMoName = state.moList.currentMoName;
    return {label: currentMoName, id: currentMoId };
  });
  const moListChoose = useSelector(state => {
    return state.moList.moList
      .filter(mo => mo.id === 417 || mo.parent === 417)
      .map(mo => 
        ({
        label: mo.name,
        id: mo.id,
      }))
  });
  const {diagram1, diagram2, diagram3} = useSelector(state => state.diagramDates);

  // content for modal
  const [content, setContent] = useState("1");
  //modal state
  const [open, setOpen] = useState(false);
  const handleOpen = (event) => {
      setOpen(true);
      setContent(event.target.id);
      console.log(event.target.id)
    }
  const handleClose = () => setOpen(false);

  // autocomplete
  const changeHandler = (event, newValue) => {
    dispatch(setCurrentMo({id: newValue.id, name: newValue.label}));
  }

  // effects
  useEffect(() => {
    dispatch(fetchMoList());
    dispatch(setCurrentMo({id: 417, name: 'Архангельская область'}));
  }, []);

  useEffect(() => {
    dispatch(fetchAppointments({
      date: dateConverter.dateToStrForRequest(diagram1),
    }));
  }, [diagram1]);

  const grid = (
    <>
      <Grid container spacing={2} sx={{
        width: '80%',
        margin: '0 auto',
      }}>
        <Grid item xs={12}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={moListChoose}
            getOptionLabel={
              option => option.label
            }
            value={currentMo}
            onChange={changeHandler}
            sx={{ width: '100%' }}
            renderInput={(params) => <TextField
              {...params}
              label="Выберите МО..."
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />}
            loading={isLoading}
          />
        </Grid>
        <Grid container spacing={2} item xs={12} md={6}>
          <Grid item xs={12}>
            <Tile curDate={diagram1} setDate={diagram1SetDate}>
              <AppointmentsPage clear={clearHighchartsCredentials} handleOpen={handleOpen}/>
            </Tile>
          </Grid>
          <Grid item xs={12}>
            <Tile curDate={diagram2} setDate={diagram2SetDate}>
              <DoctorsSemdPage clear={clearHighchartsCredentials} handleOpen={handleOpen}/>
            </Tile>
          </Grid>
        </Grid>
        <Grid container spacing={2} item xs={12} md={6}>
          <Grid item xs={12}>
            <Tile handleOpen={handleOpen} curDate={diagram3} setDate={diagram3SetDate}>
              <SemdsMSPage clear={clearHighchartsCredentials}/>
            </Tile>
          </Grid>
        </Grid>
      </Grid>
      <TileModal open={open} handleClose={handleClose}>
        {
          // это ужасная конструкция, извините...
          content === "1"
            ? <AppointmentsDetails />
            : content === "2"
              ? <DoctorsSemdDetails />
              : content === "3"
                ? <SemdsMSDetails />
                : <ErrorMsg errorTitle="Неправильная модалка" errorContent="Ну реально неправильная, алло"/>
        }
      </TileModal>
    </>
  )

  const errorInfo = (
    <Grid container spacing={2} sx={{
      width: '80%',
      margin: '0 auto',
    }}>
    <ErrorMsg errorTitle="Не удалось загрузить данные" errorContent="Обратитесь в тех.поддержку http://cspp.zdrav29.ru/"/>
    </Grid>
  )

  const loadingSkeleton = (
    <Grid container spacing={2} sx={{
      width: '80%',
      margin: '0 auto',
    }}>
      <Grid item xs={12} md={6}>
        <TileSkeleton/>
      </Grid>
      <Grid item xs={12} md={6}>
        <TileSkeleton/>
      </Grid>
      <Grid item xs={12} md={6}>
        <TileSkeleton/>
      </Grid>
      <Grid item xs={12} md={6}>
        <TileSkeleton/>
      </Grid>
    </Grid>
  )

  return(
    isLoading 
      ? loadingSkeleton
      : error
        ? errorInfo
        : grid
  )
}