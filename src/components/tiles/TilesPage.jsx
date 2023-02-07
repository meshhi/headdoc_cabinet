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
  const [content, setContent] = useState({content: 'first'});

  //modal state
  const [open, setOpen] = useState(false);
  const handleOpen = (event) => 
    {
      setOpen(true);
      setContent({content: event.target.id})
    }
  const handleClose = () => setOpen(false);

  // autocomplete
  const changeHandler = (event, newValue) => {
    dispatch(setCurrentMo({id: newValue.id, name: newValue.label}));
  }

  useEffect(() => {
    dispatch(diagram1SetDate(Number(new Date())));
    dispatch(diagram2SetDate(Number(new Date())));
    dispatch(diagram3SetDate(Number(new Date())));
    dispatch(fetchMoList());
    dispatch(fetchAppointments({
      date: diagram1,
    }));
    dispatch(setCurrentMo({id: 417, name: 'Архангельская область'}));
  }, []);

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
            // inputValue={inputValue}
            // onInputChange={inputChangeHandler}

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
            <Tile handleOpen={handleOpen} tileType="appointments" children={<AppointmentsPage clear={clearHighchartsCredentials}/>} curDate={diagram1} setDate={diagram1SetDate}/>
          </Grid>
          <Grid item xs={12}>
            <Tile handleOpen={handleOpen} tileType="doctorssemd" children={<DoctorsSemdPage clear={clearHighchartsCredentials}/>} curDate={diagram2} setDate={diagram2SetDate}/>
          </Grid>
        </Grid>
        <Grid container spacing={2} item xs={12} md={6}>
          <Grid item xs={12}>
            <Tile handleOpen={handleOpen} tileType="semdsmspage" children={<SemdsMSPage clear={clearHighchartsCredentials}/>} curDate={diagram3} setDate={diagram3SetDate}/>
          </Grid>
          {/* <Grid item xs={12}>
            <Tile handleOpen={handleOpen} tileType="4"/>
          </Grid> */}
        </Grid>
      </Grid>
      <TileModal open={open} handleClose={handleClose} content={content}></TileModal>
    </>
  )

  const errorInfo = (
    <Grid container spacing={2} sx={{
      width: '80%',
      margin: '0 auto',
    }}>
    <div>ERROR</div>
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