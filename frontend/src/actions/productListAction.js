import axios from "axios";
import { GET_PRODUCTLIST_FAIL,
         GET_PRODUCTLIST_REQUEST,
         GET_PRODUCTLIST_SUCCESS,


         GET_TOTALPRODUCT_FAIL,
         GET_TOTALPRODUCT_REQUEST,
         GET_TOTALPRODUCT_SUCCESS,

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


export const productListAction = () => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfoData },
     } = getState();
    dispatch({ type: GET_PRODUCTLIST_REQUEST });
    const { data } = await axios.get(
      `/api/products`,
      {
        headers: { Authorization: `Bearer ${userInfoData.token}` },
      }
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


export const totalNoProduct = () => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfoData },
     } = getState();
    dispatch({ type: GET_TOTALPRODUCT_REQUEST });
    const { data } = await axios.get(
      `/api/products/totalProduct`,
      {
        headers: { Authorization: `Bearer ${userInfoData.token}` },
      }
    );

    console.log(data);
    dispatch({ type: GET_TOTALPRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_TOTALPRODUCT_FAIL,
      payload:
        error.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_REQUEST });
 
  try {
    const {
      userSignin: { userInfoData },
     } = getState();
    const { data } = await axios.post(
      '/api/products',
      product,
      {
        headers: { Authorization: `Bearer ${userInfoData.token}` },
      }
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
  const {
    userSignin: { userInfoData },
  } = getState();
  try {
    const { data } = await axios.put(`/api/products/${id}`, product, 
    {
      'Content-Type': 'multipart/form-data',
      headers: { Authorization: `Bearer ${userInfoData.token}` },
     
    }
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
const {
  userSignin: { userInfoData },
} = getState();
try {
  const { data } = axios.delete(`/api/products/${productId}`,
 {
    headers: { Authorization: `Bearer ${userInfoData.token}` },
  }
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

