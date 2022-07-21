import axios from "axios";
import { GET_WAREHOUSELIST_FAIL,
         GET_WAREHOUSELIST_REQUEST,
         GET_WAREHOUSELIST_SUCCESS,

         WAREHOUSE_CREATE_REQUEST,
         WAREHOUSE_CREATE_SUCCESS,
         WAREHOUSE_CREATE_FAIL,
         WAREHOUSE_CREATE_RESET,
         WAREHOUSE_UPDATE_REQUEST,
         WAREHOUSE_UPDATE_SUCCESS,
         WAREHOUSE_UPDATE_FAIL,
         WAREHOUSE_DELETE_REQUEST,
         WAREHOUSE_DELETE_FAIL,
         WAREHOUSE_DELETE_SUCCESS,
         } from "../constants/wareHouseConstant";


export const warehouseListAction = () => async (dispatch) => {
  try {
   
    dispatch({ type: GET_WAREHOUSELIST_REQUEST });
    const { data } = await axios.get(
      `/api/warehouses`
    );

    console.log(data);
    dispatch({ type: GET_WAREHOUSELIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_WAREHOUSELIST_FAIL,
      payload:
        error.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addWarehouse = (warehouse) => async (dispatch) => {
  dispatch({ type: WAREHOUSE_CREATE_REQUEST });
 // const {
   // userSignin: { userInfo },
  //} = getState();
  try {
    const { data } = await axios.post(
      '/api/warehouses/add',
      warehouse,
      // {
      //   headers: { Authorization: `Bearer ${userInfo.token}` },
      // }
    );
    dispatch({
      type: WAREHOUSE_CREATE_SUCCESS,
      payload: data.warehouse,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: WAREHOUSE_CREATE_FAIL, payload: message });
  }
};


  

export const updatedWarehouse = (id,product) => async (dispatch, getState) => {
  dispatch({ type: WAREHOUSE_UPDATE_REQUEST, payload: product });
  // const {
  //   userSignin: { userInfo },
  // } = getState();
  try {
    const { data } = await axios.put(`/api/warehouses/${id}`, product, 
    // {
    //   headers: { Authorization: `Bearer ${userInfo.token}` },
    // }
    );
    dispatch({ type: WAREHOUSE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: WAREHOUSE_UPDATE_FAIL, error: message });
  }
};

export const deleteWarehouse = (warehouseId) => async (dispatch, getState) => {
dispatch({ type: WAREHOUSE_DELETE_REQUEST, payload: warehouseId });
// const {
//   userSignin: { userInfo },
// } = getState();
try {
  const { data } = axios.delete(`/api/warehouses/${warehouseId}`,
//  {
//     headers: { Authorization: `Bearer ${userInfo.token}` },
//   }
  );
  dispatch({ type: WAREHOUSE_DELETE_SUCCESS , payload: data});
} catch (error) {
  const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  dispatch({ type: WAREHOUSE_DELETE_FAIL, payload: message });
}
};

//   dispatch({
//     type: GET_WAREHOUSELIST_REQUEST
// });

// try {
//   const { data } = await axios.get(
//     `/api/products`
//   );
//   dispatch({
//         type: GET_WAREHOUSELIST_SUCCESS, payload: data
//     });
// } catch (error) {

//     dispatch({
//         type: GET_WAREHOUSELIST_FAIL, payload: error.message
//     });
// }

