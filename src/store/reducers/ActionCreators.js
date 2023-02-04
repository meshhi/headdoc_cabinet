import axios from "axios";
import { GET_MO_LIST_URL } from "../api_urls/apiUrls";
import { moListSlice } from "./moListSlice";

export const fetchMoList = () => async (dispatch) => {
  dispatch(moListSlice.actions.moListFetching());
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

    dispatch(moListSlice.actions.moListFetchingSuccess(response.data.results));

  } catch (error) {
    dispatch(moListSlice.actions.moListFetchingError(error.message));
  }
}