import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GET_MO_LIST_URL } from "../api_urls/apiUrls";

export const fetchMoList = createAsyncThunk(
  "moList/fetchAll",
  async (_, thunkApi) => {
    try {
      const config = {
        method: 'get',
        url: GET_MO_LIST_URL,
        // headers: {
        //   'Content-Disposition': `attachment; filename=${file.name}`
        // },
        // params: { 
        //   date: '2023-01-23',
        // },
        // data: data,
      };
  
      const response = await axios(config);
  
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message)
    }
  }
)