import axios from "axios";
import { GET_PRODUCTLIST_FAIL,
         GET_PRODUCTLIST_REQUEST,
         GET_PRODUCTLIST_SUCCESS,

         PRODUCT_CREATE_REQUEST,
         PRODUCT_CREATE_SUCCESS,
         PRODUCT_CREATE_FAIL,
         PRODUCT_CREATE_RESET,
         PRODUCT_UPDATE_REQUEST,
         PRODUCT_UPDATE_SUCCESS,
         PRODUCT_UPDATE_FAIL,
         PRODUCT_DELETE_REQUEST,
         PRODUCT_DELETE_FAIL,
         PRODUCT_DELETE_SUCCESS,
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


  

export const updateProduct = (id,product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
  // const {
  //   userSignin: { userInfo },
  // } = getState();
  try {
    const { data } = await axios.put(`/api/products/${id}`, product, 
    // {
    //   headers: { Authorization: `Bearer ${userInfo.token}` },
    // }
    );
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_UPDATE_FAIL, error: message });
  }
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
// const {
//   userSignin: { userInfo },
// } = getState();
try {
  const { data } = axios.delete(`/api/products/${productId}`,
//  {
//     headers: { Authorization: `Bearer ${userInfo.token}` },
//   }
  );
  dispatch({ type: PRODUCT_DELETE_SUCCESS , payload: data});
} catch (error) {
  const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
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

