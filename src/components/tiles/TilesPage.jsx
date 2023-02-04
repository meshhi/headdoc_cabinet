import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMoList } from '../../store/reducers/ActionCreators';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


export const TilesPage = () => {
  // clear credentials watermark on all highcharts diagrams
  const clearHighchartsCredentials = () => {
    document.querySelectorAll('.highcharts-credits').forEach((chartCredentials) => chartCredentials.style.display = 'none');
  }

  //initiate data settings got from redux
  const dispatch = useDispatch();
  const {moList, isLoading, error} = useSelector(state => state.moListReducer);
  const currentMo = moList.filter(mo => mo.id === moList.currentMoId)[0];

  useEffect(() => {
    clearHighchartsCredentials();
    dispatch(fetchMoList());
  }, []);

  return(
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <span style={{border: '1px solid black', display: 'block'}}>TEXT</span>
        </Grid>
        <Grid item xs={4}>
          <span style={{border: '1px solid black', display: 'block'}}>TEXT</span>
        </Grid>
        <Grid item xs={4}>
          <span style={{border: '1px solid black', display: 'block'}}>TEXT</span>
        </Grid>
        <Grid item xs={8}>
          <span style={{border: '1px solid black', display: 'block'}}>TEXT</span>
        </Grid>
      </Grid>
    </>
  )
}