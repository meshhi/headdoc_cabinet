import fileUploader from "../../utils/fileUploader";
import dateConverter from "../../utils/dateConverter";
import { Button } from "@mui/material";
import { useState } from "react";


const AdminPanel = () => {
  const [file, setFile] = useState(null);
  const [date, setDate] = useState(null);

  const fileChangeHandler = (event) => {
    const file = event.target.files[0];
    setFile(file);
  }

  const uploadFile = async (event) => {
    if (file) {
      let reqResult = await fileUploader.uploadAppointmentFile(file, date);
      console.log(reqResult);
    }
  }

  const changeDateHandler = (event) => {
    const chosenDate = new Date(event.target.value);
    setDate(dateConverter.dateToStrForRequest(chosenDate))
  }

  return(
    <form className="upload-form" onSubmit={event => event.preventDefault()}>
      <div className="upload__input_block">
        <label htmlFor="ind-first-input">Выберите файл</label>
        <input type="file" id="ind-first-input" onChange={fileChangeHandler}/>
      </div>
      <div className="upload__actions_block">
        <Button onClick={uploadFile}/>
      </div>
      <input type="date" name="" id="" onChange={changeDateHandler}/>
    </form>
  )
}

export default AdminPanel;