import axios from "axios";
import { GET_HOME_FAIL,
        GET_HOME_REQUEST,
        GET_HOME_SUCCESS,
        GET_HOME_RESET

        
         } from "../constants/homeConstant";


export const home123 = () => async (dispatch) => {
    dispatch({ type: GET_HOME_REQUEST });
   
    try {
        window.onload = function() {
            if(!window.location.hash) {
                window.location = window.location + '#loaded';
                window.location.reload();
            }
        }
      dispatch({ type: GET_HOME_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: GET_HOME_FAIL, payload: message });
    }
    };
    