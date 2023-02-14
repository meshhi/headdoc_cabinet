import { fetchDoctors } from "../../store/slices/ActionCreators";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const DoctorsSemdDetails = ({clear, handleOpen, tileType}) => {
  const dispatch = useDispatch();
  
  const {currentMoId, currentMoName} = useSelector(state => state.moList);
  
  useEffect(() => {

  }, []);

  return(
    <>
      <div>DoctorsSemd DETAILS</div>
    </>
  )
}

export default DoctorsSemdDetails;