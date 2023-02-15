import { useSelector } from "react-redux";
import { DataGrid } from '@mui/x-data-grid';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import { Reorder } from "@mui/icons-material";
import dateConverter from "../../utils/dateConverter";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";

const AppointmentsDetails = ({clear, handleOpen, tileType}) => {
  const {appointments, isLoading, error} = useSelector(state => state.appointments);
  const {currentMoId, currentMoName} = useSelector(state => ({currentMoId: state.moList.currentMoId, currentMoName: state.moList.currentMoName}));
  const {diagram1} = useSelector(state => state.diagramDates);

  const [isWatermarkFound, setWatermarkFound] = useState(false);

  const clearMUIWatermark = () => {
    let xpath = "//div[text()='MUI X: Missing license key']";

    const findWM = (intervalId) => {
      try {
        let matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        clearInterval(intervalId);
        setWatermarkFound(true);
        matchingElement.remove();
      } catch(e) {
        console.warn('clearMUIWatermark initiated!')
      }
    }

    const intervalId = setInterval(() => findWM(intervalId), 10);
  }

  useEffect(() => {
    clearMUIWatermark();
  }, []) 

  const currentMoAppointments = useSelector(state => state.appointments.appointments
    .filter(record => {
      return record.mo.parent === currentMoId;
    })
    .map(record => {
      return {
        id: record.mo.id,
        name: record.mo.name,
        oid: record.mo.oid,
        allRecords: record.all_records,
        percent: record.percent,
        difference: record.difference,
      }
    })
  );

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'СП',
      width: 700,
      // editable: true,
    },
    {
      field: 'oid',
      headerName: 'OID',
      width: 150,
      // editable: true,
    },
    {
      field: 'allRecords',
      headerName: 'Всего записей',
      type: 'number',
      width: 110,
      // editable: true,
    },
    {
      field: 'percent',
      headerName: 'Процент',
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      width: 160,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'difference',
      headerName: 'Разница',
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      width: 160,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];

  return(
    <>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Grid container >
          <Grid>
            <Typography variant="h5" sx={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>Удаленная запись ко врачу {dateConverter.dateToStrForRequest(diagram1)}</Typography>
          </Grid>
          <Grid>
            <Typography variant="h5" sx={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>: {currentMoName}</Typography>
          </Grid>
        </Grid>

        <div style={{ flexGrow: 1, }}>
          <DataGridPremium
            rows={currentMoAppointments}
            columns={columns}
            // pageSize={5}
            // rowsPerPageOptions={[5]}
            // checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        </div>
      </div>
    </>
  )
}

export default AppointmentsDetails;