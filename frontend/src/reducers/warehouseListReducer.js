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
    WAREHOUSE_UPDATE_RESET,
    WAREHOUSE_DELETE_REQUEST,
    WAREHOUSE_DELETE_FAIL,
    WAREHOUSE_DELETE_SUCCESS,
    } from "../constants/wareHouseConstant";

    export const warehouseListReducer = (state = { warehouseLists: [] }, action) => {
        switch (action.type) {
          case GET_WAREHOUSELIST_REQUEST:
            return { loading: true, warehouseLists: [] };
      
          case GET_WAREHOUSELIST_SUCCESS:
            return { loading: false, warehouseLists: action.payload };
      
          case GET_WAREHOUSELIST_FAIL:
            return { loading: false, warehouseLists: action.payload };
      
          default:
            return state;
        }
      };


      export const totalWarehouseReducer = (state = {}, action) => {
        switch (action.type) {
          case GET_WAREHOUSELIST_REQUEST:
            return { loading: true, };
      
          case GET_WAREHOUSELIST_SUCCESS:
            return { loading: false, totalWarehouses: action.payload };
      
          case GET_WAREHOUSELIST_FAIL:
            return { loading: false, totalWarehouses: action.payload };
      
          default:
            return state;
        }
      };

      export const warehouseCreateReducer = (state = {}, action) => {
        switch (action.type) {
          case WAREHOUSE_CREATE_REQUEST:
            return { loading: true };
          case WAREHOUSE_CREATE_SUCCESS:
            return { loading: false, userInfo: action.payload };
          case WAREHOUSE_CREATE_FAIL:
            return { loading: false, error: action.payload };
          default:
            return state;
        }
      };

      export const warehouseDeleteReducer = (state = {}, action) => {
        switch (action.type) {
          case WAREHOUSE_DELETE_REQUEST:
            return { loading: true };
          case WAREHOUSE_DELETE_FAIL:
            return { loading: false, success: true };
          case WAREHOUSE_DELETE_SUCCESS:
            return { loading: false, error: action.payload };
          default:
            return state;
        }
      };

      export const warehouseUpdateReducer = (state = {}, action) => {
        switch (action.type) {
          case WAREHOUSE_UPDATE_REQUEST:
            return { loading: true };
          case WAREHOUSE_UPDATE_SUCCESS:
            return { loading: false, success: true };
          case WAREHOUSE_UPDATE_FAIL:
            return { loading: false, error: action.payload };
          case WAREHOUSE_UPDATE_RESET:
            return {};
          default:
            return state;
        }
      };