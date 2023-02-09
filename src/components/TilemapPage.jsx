import TileMap from "./diagrams/Tilemap";
import { setCurrentMo } from "../store/slices/moListSlice";
import { Grid } from "@mui/material";

const TilemapPage = ({clear}) => {
  return(
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={6}>
        <TileMap clear={clear} setCurrentMo={setCurrentMo}/>
      </Grid>
    </Grid>
  )
}

export default TilemapPage;