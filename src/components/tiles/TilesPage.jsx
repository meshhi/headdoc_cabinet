import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchMoList } from '../../store/reducers/ActionCreators';
import Grid from '@mui/material/Grid';
import Tile from './Tile'
import TileModal from "./TileModal";


export const TilesPage = () => {
  // clear credentials watermark on all highcharts diagrams
  const clearHighchartsCredentials = () => {
    document.querySelectorAll('.highcharts-credits').forEach((chartCredentials) => chartCredentials.style.display = 'none');
  }

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
    clearHighchartsCredentials();
    dispatch(fetchMoList());
  }, []);

  return(
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Tile handleOpen={handleOpen} tileType="appoints"/>
        </Grid>
        <Grid item xs={4}>
        <Tile handleOpen={handleOpen} tileType="2"/>
        </Grid>
        <Grid item xs={4}>
        <Tile handleOpen={handleOpen} tileType="3"/>
        </Grid>
        <Grid item xs={8}>
        <Tile handleOpen={handleOpen} tileType="4"/>
        </Grid>
      </Grid>
      <TileModal open={open} handleClose={handleClose} content={content}></TileModal>
    </>
  )
}