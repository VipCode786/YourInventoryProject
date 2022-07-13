import axios from "axios";
import { GET_PRODUCTLIST_FAIL,
         GET_PRODUCTLIST_REQUEST,
         GET_PRODUCTLIST_SUCCESS,

         PRODUCT_CREATE_REQUEST,
         PRODUCT_CREATE_SUCCESS,
         PRODUCT_CREATE_FAIL,
         PRODUCT_CREATE_RESET,
         } from "../constants/productListConstants";


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
};

export const createProduct = (product) => async (dispatch) => {
  dispatch({ type: PRODUCT_CREATE_REQUEST });
 // const {
   // userSignin: { userInfo },
  //} = getState();
  try {
    const { data } = await axios.post(
      '/api/products',
      product,
      // {
      //   headers: { Authorization: `Bearer ${userInfo.token}` },
      // }
    );
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_CREATE_FAIL, payload: message });
  }
};


  

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

