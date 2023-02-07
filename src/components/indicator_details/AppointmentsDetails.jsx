import { useSelector } from "react-redux";
import { DataGrid } from '@mui/x-data-grid';
import { Reorder } from "@mui/icons-material";
import dateConverter from "../../utils/dateConverter";

const AppointmentsDetails = ({clear, handleOpen, tileType}) => {
  const {appointments, isLoading, error} = useSelector(state => state.appointments);
  const {currentMoId, currentMoName} = useSelector(state => ({currentMoId: state.moList.currentMoId, currentMoName: state.moList.currentMoName}));
  const {diagram1} = useSelector(state => state.diagramDates);

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
      // width: '100%',
      // editable: true,
    },
    {
      field: 'oid',
      headerName: 'OID',
      // width: 150,
      // editable: true,
    },
    {
      field: 'allRecords',
      headerName: 'Всего записей',
      type: 'number',
      // width: 110,
      // editable: true,
    },
    {
      field: 'percent',
      headerName: 'Процент',
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      // width: 160,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'difference',
      headerName: 'Разница',
      description: 'This column has a value getter and is not sortable.',
      sortable: true,
      // width: 160,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];

  return(
    <>
      <div>{currentMoName} {dateConverter.dateToStr(diagram1)}</div>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1, }}>
          <DataGrid
            rows={currentMoAppointments}
            columns={columns}
            // pageSize={5}
            // rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        </div>
      </div>
    </>
  )
}

export default AppointmentsDetails;