import {
  REQUEST_AVAILABLE_SITES,
  SUCCESS_AVAILABLE_SITES,
  FAIL_AVAILABLE_SITES,
  CLEAR_ERRORS,
  REQUEST_MAIN_DATA,
  SUCCESS_MAIN_DATA,
  FAIL_MAIN_DATA,
} from "../constants/scrapeConstant";
//scrape reducer
export const availableReducer = (state = { available: [] }, action) => {
  switch (action.type) {
    case REQUEST_AVAILABLE_SITES:
      return {
        ...state,
        loading: true,
        available: false,
      };

    case SUCCESS_AVAILABLE_SITES:
      return {
        loading: false,
        available: action.payload,
      };

    case FAIL_AVAILABLE_SITES:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
//get results
export const resultReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case REQUEST_MAIN_DATA:
      return {
        ...state,
        loading: true,
        data: false,
      };

    case SUCCESS_MAIN_DATA:
      return {
        loading: false,
        data: action.payload,
      };

    case FAIL_MAIN_DATA:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
