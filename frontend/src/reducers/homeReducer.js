import { GET_HOME_FAIL,
    GET_HOME_REQUEST,
    GET_HOME_SUCCESS,
    GET_HOME_RESET

    
     } from "../constants/homeConstant";

export const homeReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_HOME_REQUEST:
        return { loading: true };
      case GET_HOME_SUCCESS:
        return { loading: false, success: true };
      case GET_HOME_FAIL:
        return { loading: false, error: action.payload };
      case GET_HOME_RESET:
        return {};
      default:
        return state;
    }
  };

  