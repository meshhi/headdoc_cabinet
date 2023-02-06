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

      // return [{label:'first mo',}, {label:'second mo',}]
      // return [      { label: 'The Shawshank Redemption', year: 1994 },
      // { label: 'The Godfather', year: 1972 },
      // { label: 'The Godfather: Part II', year: 1974 },
      // { label: 'The Dark Knight', year: 2008 },
      // { label: '12 Angry Men', year: 1957 },]

      
      const response = await axios(config);
  
      return response.data.results;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message)
    }
  }
)