import TileMap from "./diagrams/Tilemap";
import { setCurrentMo } from "../store/slices/moListSlice";
import { Grid, Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const TilemapPage = ({clear}) => {
  const [currentIndicator, setCurrentIndicator] = useState({
    label: 'Запись ко врачу', id: 1,
  });


  useEffect(() => {

  })

  return(
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={12}>
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
      <Grid container item xs={12} justifyContent="center" alignItems="center">
        <TileMap clear={clear} setCurrentMo={setCurrentMo} indicator={currentIndicator.id}/>
      </Grid>
    </Grid>
  )
}

export default TilemapPage;