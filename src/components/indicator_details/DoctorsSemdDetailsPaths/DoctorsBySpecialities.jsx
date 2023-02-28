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

const DoctorsBySpecialities = ({clear, handleOpen, tileType, specialityId}) => {
  const dispatch = useDispatch();
  const [isWatermarkFound, setWatermarkFound] = useState(false);
  const [noDataFlag, setNoDataFlag] = useState(false);

  const {currentMoId, currentMoName} = useSelector(state => state.moList);
  const {doctors, isLoading: doctorsLoading, error} = useSelector(state => state.doctors)
  const {diagram2} = useSelector(state => state.diagramDates);

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

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'Имя',
      width: 700,
      // editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Фамилия',
      width: 150,
      // editable: true,
    },
    {
      field: 'secondName',
      headerName: 'Отчество',
      type: 'number',
      width: 110,
      // editable: true,
    },
    {
      field: 'snils',
      headerName: 'СНИЛС',
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      width: 160,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'moId',
      headerName: 'ИД ТВСП',
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      width: 160,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];
  
  useEffect(() => {
    const reqData = {
      moId: currentMoId,
      tvspId: null,
      specId: specialityId ? specialityId : null,
    }
    dispatch(fetchDoctors(reqData));
  }, []);

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
              rows={currentMoDoctors}
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

export default DoctorsBySpecialities;