import { UPLOAD_BI_FILE_URL } from "../store/api_urls/apiUrls";
import axios from "axios";

class FileUploader {
  constructor() {
    this.appointmentFileUpURL = UPLOAD_BI_FILE_URL;
  }

  async uploadAppointmentFile (file, date) {
    try {
      const data = new FormData();
      data.append('file', file);
      data.append('test', 'testValue');

      const config = {
        method: 'put',
        url: this.appointmentFileUpURL,
        headers: {
          'Content-Disposition': `attachment; filename=${file.name}`,
        },
        params: { 
          date: date,
        },
        data: data,
      };

      let response = await axios(config);

      return response;
    } catch (error) {
      return error;
    }
  }
}

export default new FileUploader();