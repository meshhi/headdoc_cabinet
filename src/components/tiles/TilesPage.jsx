import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMoList } from '../../store/reducers/ActionCreators';
// import { Grid, Item } from '@mui/material'

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
      {/* <Grid container spacing={2}>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
      </Grid> */}
    </>
  )
}