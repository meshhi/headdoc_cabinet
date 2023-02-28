import { fetchDoctors, fetchMoMeddocs } from "../../store/slices/ActionCreators";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useLayoutEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Grid } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import { Typography } from "@mui/material";
import dateConverter from "../../utils/dateConverter";

const DoctorsSemdDetails = ({clear, handleOpen, tileType}) => {
  const dispatch = useDispatch();
  const [isWatermarkFound, setWatermarkFound] = useState(false);
  const [noDataFlag, setNoDataFlag] = useState(false);

  const {currentMoId, currentMoName} = useSelector(state => state.moList);
  const {doctors, isLoading: doctorsLoading, error} = useSelector(state => state.doctors)
  const {diagram2} = useSelector(state => state.diagramDates);
  const {moMeddocs, isLoading: momeddocsLoading, momeddocsError} = useSelector(state => state.meddocs);

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
  
  const currentMoDoctors = useSelector(state => {
      const doctors = state.doctors.doctors;

      return doctors.map(record => {
        try {
          return {
            id: record.id,
            firstName: record?.first_name ? record.first_name[0] : '-',
            lastName: record?.last_name ? record.last_name[0] : '-',
            secondName: record?.second_name ? record.second_name[0] : '-',
            snils: record.snils,
            moId: record.mo,
          }
        } catch(e) {
          columns.warn(record);
        }
      })
    }
  );

  const transformSpecialities = (specialities) => {
    const result = [];
    for (let key of Object.keys(specialities)) {
      result.push({
        id: key,
        ...specialities[key],
      })
    }
    return result;
  }

  const columns = [
    { field: 'id', headerName: 'ID специальности', width: 90 },
    {
      field: 'title',
      headerName: 'Специальность',
      width: 700,
      // editable: true,
    },
    {
      field: 'percent',
      headerName: 'Процент',
      width: 150,
      // editable: true,
    },

  ];
  
  useEffect(() => {
    const reqData = {
      moId: currentMoId,
      tvspId: null,
    }

    dispatch(fetchDoctors(reqData));
  }, [currentMoId]);

  useEffect(() => {
    if (!doctors.length && !noDataFlag) {
      setNoDataFlag(true);
    } else {
      setNoDataFlag(false);
    }
  }, [doctors])

  useLayoutEffect(() => {
    // clearMUIWatermark();
  }, [])

  return(
    <>
      {
        doctorsLoading
        ? <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        :
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Grid container >
            <Grid>
              <Typography variant="h5" sx={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>Врачи-СЭМД {dateConverter.dateToStrForRequest(diagram2)}</Typography>
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
              rows={transformSpecialities(moMeddocs.specialities)}
              columns={columns}
              // pageSize={5}
              // rowsPerPageOptions={[5]}
              // checkboxSelection
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
            />
          } 
          </div>
        </div>
      }
      {/* {
        doctors.map(doc => console.log(doc))
      } */}
    </>
  )
}

export default DoctorsSemdDetails;