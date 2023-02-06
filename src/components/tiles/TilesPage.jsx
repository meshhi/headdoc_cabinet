// hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";

// redux
import { fetchMoList } from '../../store/reducers/ActionCreators';

// components
import Grid from '@mui/material/Grid';
import Tile from './Tile'
import TileModal from "./TileModal";
import TileSkeleton from "./TileSkeleton";
// tile pages
import AppointmentsPage from "../indicator_pages/AppointmentsPage";
import DoctorsSemdPage from "../indicator_pages/DoctorsSemdPage";
import SemdsMSPage from "../indicator_pages/SemdsMSPage";


export const TilesPage = () => {
  // clear credentials watermark on all highcharts diagrams
  const clearHighchartsCredentials = useCallback(() => {
    document.querySelectorAll('.highcharts-credits').forEach((chartCredentials) => chartCredentials.style.display = 'none');
  });

  //initiate data settings got from redux
  const dispatch = useDispatch();
  const {moList, isLoading, error} = useSelector(state => state.moListReducer);
  const currentMo = moList.filter(mo => mo.id === moList.currentMoId)[0];

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

  useEffect(() => {
    dispatch(fetchMoList());
  }, []);

  const grid = (
    <>
      <Grid container spacing={2} sx={{
        width: '80%',
        margin: '0 auto',
      }}>
        <Grid item xs={12} md={6}>
          <Tile handleOpen={handleOpen} tileType="appointments" children={<AppointmentsPage clear={clearHighchartsCredentials}/>}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <Tile handleOpen={handleOpen} tileType="doctorssemd" children={<DoctorsSemdPage clear={clearHighchartsCredentials}/>}/>
        </Grid>
        <Grid item xs={12} md={6}>
        <Tile handleOpen={handleOpen} tileType="semdsmspage" children={<SemdsMSPage clear={clearHighchartsCredentials}/>}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <Tile handleOpen={handleOpen} tileType="4"/>
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