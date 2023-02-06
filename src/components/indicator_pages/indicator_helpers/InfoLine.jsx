import { Grid, Typography, Tooltip } from "@mui/material"
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const InfoLine = ({indicatorNumber, tooltipText}) => {
  return(
    <Grid container spacing={1}>
      <Grid item xs={11}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {indicatorNumber}
        </Typography>
      </Grid>
      <Grid item xs={1} sx={{ textAlign: 'center' }} >
        <Tooltip title={tooltipText}>
          <InfoOutlinedIcon sx={{ cursor: 'pointer' }} />
        </Tooltip>
      </Grid>
    </Grid>
  )
}

export default InfoLine;