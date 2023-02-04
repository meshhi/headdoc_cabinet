import { Typography } from "@mui/material"
import DoctorsSemdBar from "../diagrams/DoctorsSemd/DoctorsSemdBar";
import DoctorsSemdBarSum from "../diagrams/DoctorsSemd/DoctorsSemdBarSum";

const DoctorsSemdPage = () => {

  return(
    <>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        1.2.6.2
      </Typography>
      <Typography variant="h5" component="div">
      Доля врачей, у которых не менее 2 СЭМД
      </Typography>
      <DoctorsSemdBarSum />
    </>
  )
}

export default DoctorsSemdPage;