import TileMap from "../diagrams/Tilemap";
import { setCurrentMo } from "../../store/slices/moListSlice";
import { Grid, Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TilemapFilter from "./TilemapFilter";

const TilemapPage = ({clear}) => {
  const [currentIndicator, setCurrentIndicator] = useState({
    label: 'Запись ко врачу', id: 1,
  });

  return(
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <TilemapFilter currentIndicator={currentIndicator} setCurrentIndicator={setCurrentIndicator}/>
      </Grid>
      <Grid item xs={12} container justifyContent="center" alignItems="center">
        <div className="highcharts-tilemap">
          <TileMap clear={clear} setCurrentMo={setCurrentMo} indicator={currentIndicator.id}/>
        </div>
      </Grid>
    </Grid>
  )
}

export default TilemapPage;