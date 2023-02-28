import { fetchDoctors } from "../../../store/slices/ActionCreators";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useLayoutEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Grid } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import { Typography } from "@mui/material";
import dateConverter from "../../../utils/dateConverter";
import { fetchDoctorMeddocs } from "../../../store/slices/ActionCreators";

const MeddocsByDoctor = ({clear, handleOpen, tileType, doctorId, doctorOptions}) => {
  const dispatch = useDispatch();
  const [isWatermarkFound, setWatermarkFound] = useState(false);
  const [noDataFlag, setNoDataFlag] = useState(false);

  const {currentMoId, currentMoName} = useSelector(state => state.moList);
  const {doctors, isLoading: doctorsLoading, error} = useSelector(state => state.doctors)
  const {diagram2} = useSelector(state => state.diagramDates);

  const {doctorMeddocs, isLoading: isLoadingMeddocs, error: errorMeddocs} = useSelector(state => state.meddocs);

  const clearMUIWatermark = () => {
    let xpath = "//div[text()='MUI X: Missing license key']";

    const findWM = (intervalId) => {
      clearInterval(intervalId);

      try {
        let matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        setWatermarkFound(true);
        matchingElement.remove();
      } catch(e) {
        console.warn('clearMUIWatermark initiated!')
        const repeatIntervalId = setInterval(() => {
          findWM(repeatIntervalId)}, 1);
      }
    }

    const intervalId = setInterval(() => {
      findWM(intervalId)}, 1);
  }
  
  useEffect(() => {
    const reqData = {
      doctorId: doctorId,
    }
    dispatch(fetchDoctorMeddocs(reqData));
  }, []);

  useEffect(() => {
    if (!doctorMeddocs?.length && !noDataFlag) {
      setNoDataFlag(true);
    } else {
      setNoDataFlag(false);
    }
  }, [doctorMeddocs])

  useLayoutEffect(() => {
    // clearMUIWatermark();
  }, [])

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'doctor', headerName: 'ID доктор', width: 90 },
    {
      field: 'doc_type',
      headerName: 'Тип ЭМД',
      width: 700,
      // editable: true,
    },
    {
      field: 'sign',
      headerName: 'Подпись врача',
      width: 150,
      // editable: true,
    },
    {
      field: 'org_sign',
      headerName: 'Подпись МО',
      width: 150,
      // editable: true,
    },
    {
      field: 'doc_count',
      headerName: 'Количество',
      width: 150,
      // editable: true,
    },
  ];

  return(
    <>
      {
        isLoadingMeddocs
        ? <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        :
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Grid container >
            <Grid>
              <Typography variant="h5" sx={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>{doctorOptions.firstName} {doctorOptions.secondName}
              {doctorOptions.lastName} {dateConverter.dateToStrForRequest(diagram2)}</Typography>
            </Grid>
            <Grid>
              <Typography variant="h5" sx={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>: {currentMoName}</Typography>
            </Grid>
          </Grid>

          <div style={{ flexGrow: 1, }}>
          {
          noDataFlag 
            ? 'NO DATA'
            : <DataGridPremium
              rows={doctorMeddocs ? doctorMeddocs : []}
              columns={columns}
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
            />
          } 
          </div>
        </div>
      }
    </>
  )
}

export default MeddocsByDoctor;