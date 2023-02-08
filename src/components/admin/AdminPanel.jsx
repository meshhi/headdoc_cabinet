import fileUploader from "../../utils/fileUploader";
import dateConverter from "../../utils/dateConverter";
import { Button } from "@mui/material";
import { useState } from "react";
import { Card, CardActionArea, CardContent, Grid } from "@mui/material";


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
    <Grid container>
      <Grid item>
        <Card>
          <CardActionArea>
            <CardContent>
              <div className="upload__input_block">
                <label htmlFor="ind-first-input">Выберите файл</label>
                <input type="file" id="ind-first-input" onChange={fileChangeHandler}/>
              </div>
              <Button onClick={uploadFile}>Отправить файл</Button>
              <input type="date" name="" id="" onChange={changeDateHandler}/>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AdminPanel;