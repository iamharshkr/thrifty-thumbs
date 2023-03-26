import axios from "axios";
import {
  CLEAR_ERRORS,
  FAIL_AVAILABLE_SITES,
  FAIL_MAIN_DATA,
  REQUEST_AVAILABLE_SITES,
  REQUEST_MAIN_DATA,
  SUCCESS_AVAILABLE_SITES,
  SUCCESS_MAIN_DATA,
} from "../constants/scrapeConstant";

//available sites
export const availableSites = () => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_AVAILABLE_SITES });

    const { data } = await axios.get("/api/available/");
    dispatch({
      type: SUCCESS_AVAILABLE_SITES,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_AVAILABLE_SITES,
      payload: error.response.data.error,
    });
  }
};
//get result
export const getResult = (store, keyword) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_MAIN_DATA });

    const { data } = await axios.get(`/api/scrape/${store}?keyword=${keyword}`);
    dispatch({
      type: SUCCESS_MAIN_DATA,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_MAIN_DATA,
      payload: error.response.data.error,
    });
  }
};

//clear errors
export const clearError = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_ERRORS });
  } catch (error) {
    console.log(error);
  }
};
