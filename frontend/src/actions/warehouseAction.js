import axios from "axios";
import { GET_WAREHOUSELIST_FAIL,
         GET_WAREHOUSELIST_REQUEST,
         GET_WAREHOUSELIST_SUCCESS,

         GET_TOTALWAREHOUSE_FAIL,
         GET_TOTALWAREHOUSE_REQUEST,
         GET_TOTALWAREHOUSE_SUCCESS,

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


export const warehouseListAction = () => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfoData },
     } = getState();
    dispatch({ type: GET_WAREHOUSELIST_REQUEST });
    const { data } = await axios.get(
      `/api/warehouses`,
      {
        headers: { Authorization: `Bearer ${userInfoData.token}` },
      }
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


export const totalWarehouseCount = () => async (dispatch, getState) => {
  try {
    // const {
    //   userSignin: { userInfoData },
    //  } = getState();
    dispatch({ type: GET_TOTALWAREHOUSE_REQUEST });
    const { data } = await axios.get(
      `/api/warehouses/totalWarehouse`,
      // {
      //   headers: { Authorization: `Bearer ${userInfoData.token}` },
      // }
    );

    console.log(data);
    dispatch({ type: GET_TOTALWAREHOUSE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_TOTALWAREHOUSE_FAIL,
      payload:
        error.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const addWarehouse = (warehouse) => async (dispatch,getState) => {
  dispatch({ type: WAREHOUSE_CREATE_REQUEST });
  const {
    userSignin: { userInfoData },
   } = getState();
  try {
    const { data } = await axios.post(
      '/api/warehouses/add',
      warehouse,
      {
        headers: { Authorization: `Bearer ${userInfoData.token}` },
      }
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
  const {
    userSignin: { userInfoData },
   } = getState();
  try {
    const { data } = await axios.put(`/api/warehouses/${id}`, product, 
    {
      headers: { Authorization: `Bearer ${userInfoData.token}` },
    }
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
const {
  userSignin: { userInfoData },
} = getState();
try {
  const { data } = axios.delete(`/api/warehouses/${warehouseId}`,
 {
    headers: { Authorization: `Bearer ${userInfoData.token}` },
  }
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

