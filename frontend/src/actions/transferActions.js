import axios from "axios";
import { PRODUCT_TRANSFER_FAIL, PRODUCT_TRANSFER_REQUEST, PRODUCT_TRANSFER_SUCCESS } from "../constants/transferConstant";






export const transferAction = (product) => async (dispatch) => {
    try {
     
      dispatch({ type: PRODUCT_TRANSFER_REQUEST });
      const { data } = await axios.post(
        '/api/transfer',
        product,
      );

      
  
      console.log(data);
      dispatch({ type: PRODUCT_TRANSFER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_TRANSFER_FAIL,
        payload:
          error.data && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  