import axios from "axios";
import { GET_PRODUCTLIST_FAIL, GET_PRODUCTLIST_REQUEST, GET_PRODUCTLIST_SUCCESS } from "../constants/productListConstants";


export const productListAction = () => async (dispatch) => {
  try {
   
    dispatch({ type: GET_PRODUCTLIST_REQUEST });
    const { data } = await axios.get(
      `/api/products`
    );

    console.log(data);
    dispatch({ type: GET_PRODUCTLIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTLIST_FAIL,
      payload:
        error.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }

//   dispatch({
//     type: GET_PRODUCTLIST_REQUEST
// });

// try {
//   const { data } = await axios.get(
//     `/api/products`
//   );
//   dispatch({
//         type: GET_PRODUCTLIST_SUCCESS, payload: data
//     });
// } catch (error) {

//     dispatch({
//         type: GET_PRODUCTLIST_FAIL, payload: error.message
//     });
// }

};