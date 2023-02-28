import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GET_MO_LIST_URL, GET_APPOINTMENTS_URL, LOGIN, LOGIN_ESIA, LOGOUT, GET_DOCTOR_LIST, GET_SIGNED_ESIA_URL, CHECK_AUTHENTICATION, GET_MO_MEDDOCS, GET_DOCTOR_MEDDOCS } from "../api_urls/apiUrls";

// moListSlice
export const fetchMoList = createAsyncThunk(
  "moList/fetchAll",
  async (_, thunkApi) => {
    try {
      const config = {
        method: 'get',
        url: GET_MO_LIST_URL,
        headers: {
          // 'Content-Disposition': `attachment; filename=${file.name}`,
          'Authorization': `Token ${localStorage.getItem('authToken')}`
        },
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

// doctorsSemdSlice
export const fetchDoctors = createAsyncThunk(
  "doctors/fetchDoctors",
  async (reqData, thunkApi) => {
    try {
      const config = {
        method: 'get',
        url: GET_DOCTOR_LIST,
        headers: {
          'Authorization': `Token ${localStorage.getItem('authToken')}`
        },
        params: { 
          tvsp_id: reqData.tvspId,
          mo_id: reqData.moId,
          spec_code: reqData.specId,
        },

        // data: {
        //   username: reqData.username,
        //   password: reqData.password,
        // },
      };

      const response = await axios(config);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message)
    }
  }
)

// userSlice
export const login = createAsyncThunk(
  "auth/login",
  async (reqData, thunkApi) => {
    try {
      const config = {
        method: 'post',
        url: LOGIN,
        // headers: {
        //   'Content-Disposition': `attachment; filename=${file.name}`
        // },
        // params: { 
        //   code: reqData.code,
        //   state: reqData.state,
        // },
        data: {
          username: reqData.username,
          password: reqData.password,
        },
      };
      
      const response = await axios(config);
      localStorage.setItem('authToken', response.data.auth_token);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message)
    }
  }
)

export const logout = createAsyncThunk(
  "auth/logout",
  async (reqData, thunkApi) => {
    try {
      const config = {
        method: 'post',
        url: LOGOUT,
        headers: {
          'Authorization': `Token ${localStorage.getItem('authToken')}`
        },
        // params: { 
        //   date: reqData.date,
        // },

        // data: {
        //   username: reqData.username,
        //   password: reqData.password,
        // },
      };
      const response = await axios(config);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    } finally {
      localStorage.removeItem('authToken');
    }
  }
)


export const getEsiaUrl = createAsyncThunk(
  "auth/getEsiaUrl",
  async (reqData, thunkApi) => {
    try {
      const config = {
        method: 'get',
        url: GET_SIGNED_ESIA_URL,
        // headers: {
        //   'Content-Disposition': `attachment; filename=${file.name}`
        // },
        // params: { 
        //   code: reqData.code,
        //   state: reqData.state,
        // },
        // data: {
        //   username: reqData.username,
        //   password: reqData.password,
        // },
      };
      
      const response = await axios(config);
      // localStorage.setItem('authToken', response.data.auth_token);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message)
    }
  }
)

export const loginEsia = createAsyncThunk(
  "auth/loginEsia",
  async (reqData, thunkApi) => {
    try {
      const config = {
        method: 'get',
        url: LOGIN_ESIA,
        // headers: {
        //   'Content-Disposition': `attachment; filename=${file.name}`
        // },
        params: { 
          code: reqData.code,
          state: reqData.state,
        },
        // data: {
        //   username: reqData.username,
        //   password: reqData.password,
        // },
      };
      
      const response = await axios(config);
      localStorage.setItem('authToken', response.data.auth_token);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message)
    }
  }
)

export const checkAuthentication = createAsyncThunk(
  "auth/checkAuthentication",
  async (reqData, thunkApi) => {
    try {
      const data = new FormData();
      data.append('token', localStorage.getItem('authToken'));

      const config = {
        method: 'post',
        url: CHECK_AUTHENTICATION,
        // headers: {
        //   'Content-Disposition': `attachment; filename=${file.name}`
        // },
        // params: { 
        //   code: reqData.code,
        //   state: reqData.state,
        // },
        data: data,
      };
      
      const response = await axios(config);
      // localStorage.setItem('authToken', response.data.auth_token);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message)
    }
  }
)

// appointmentsSlice
export const fetchAppointments = createAsyncThunk(
  "appointments/fetch",
  async (reqData, thunkApi) => {
    try {
      const config = {
        method: 'get',
        url: GET_APPOINTMENTS_URL,
        headers: {
          // 'Content-Disposition': `attachment; filename=${file.name}`,
          'Authorization': `Token ${localStorage.getItem('authToken')}`
        },
        params: { 
          date: reqData.date,
        },
        // data: data,
      };
      
      const response = await axios(config);
  
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message)
    }
  }
)

// meddocsSlice
export const fetchMoMeddocs = createAsyncThunk(
  "doctorssemd/moMedDocs",
  async (reqData, thunkApi) => {
    try {
      const config = {
        method: 'get',
        url: `${GET_MO_MEDDOCS}${reqData.moId}/${reqData.date}/`,
        headers: {
          'Authorization': `Token ${localStorage.getItem('authToken')}`
        },
        // params: { 
        //   tvsp_id: reqData.tvspId,
        //   mo_id: reqData.moId,
        // },
        // data: {
        //   username: reqData.username,
        //   password: reqData.password,
        // },
      };

      const response = await axios(config);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message)
    }
  }
)

export const fetchDoctorMeddocs = createAsyncThunk(
  "doctorssemd/doctorMedDocs",
  async (reqData, thunkApi) => {
    try {
      const config = {
        method: 'get',
        url: `${GET_DOCTOR_MEDDOCS}${reqData.doctorId}/`,
        headers: {
          'Authorization': `Token ${localStorage.getItem('authToken')}`
        },
        // params: { 
        //   tvsp_id: reqData.tvspId,
        //   mo_id: reqData.moId,
        // },
        // data: {
        //   username: reqData.username,
        //   password: reqData.password,
        // },
      };

      const response = await axios(config);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message)
    }
  }
)

