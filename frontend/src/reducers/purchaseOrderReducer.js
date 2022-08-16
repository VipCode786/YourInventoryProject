import { 
    PURCHASE_ORDER_CREATE_REQUEST,
    PURCHASE_ORDER_CREATE_SUCCESS,
    PURCHASE_ORDER_CREATE_FAIL,
    PURCHASE_ORDER_CREATE_RESET,
    
    GET_PURCHASE_ORDER_REQUEST,
    GET_PURCHASE_ORDER_SUCCESS,
    GET_PURCHASE_ORDER_FAIL,

    TOTAL_PURCHASE_ORDER_REQUEST,
    TOTAL_PURCHASE_ORDER_SUCCESS,
    TOTAL_PURCHASE_ORDER_FAIL,
    
    GET_PURCHASE_ORDER_DETAIL_REQUEST,
    GET_PURCHASE_ORDER_DETAIL_SUCCESS,
    GET_PURCHASE_ORDER_DETAIL_FAIL


    } from "../constants/purchaseOrderConstants";


    export const purchaseDetailsReducer = (state = { loading: true }, action) => {

      switch(action.type){
          case GET_PURCHASE_ORDER_DETAIL_REQUEST: return {loading: true};
          case GET_PURCHASE_ORDER_DETAIL_SUCCESS: return {loading: false, purchaseOrderDetail: action.payload};
          case GET_PURCHASE_ORDER_DETAIL_FAIL:  return {loading: false, error: action.payload };
          default: return state;
      }
  };


 export const purchaseOrderReducer = (state = {}, action) => {
    switch (action.type) {
      case PURCHASE_ORDER_CREATE_REQUEST:
        return { loading: true };
      case PURCHASE_ORDER_CREATE_SUCCESS:
        return { loading: false, success: true, purchaseProducts: action.payload };
      case PURCHASE_ORDER_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case PURCHASE_ORDER_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };

  export const purchaseOrderListReducer = (state = { purchaseOrderLists: [] }, action) => {
    switch (action.type) {
      case GET_PURCHASE_ORDER_REQUEST:
        return { loading: true, purchaseOrderLists: [] };
  
      case GET_PURCHASE_ORDER_SUCCESS:
        return { loading: false, purchaseOrderLists: action.payload };
  
      case GET_PURCHASE_ORDER_FAIL:
        return { loading: false, purchaseOrderLists: action.payload };
  
      default:
        return state;
    }
  };


  export const totalpurchaseOrderReducer = (state = { }, action) => {
    switch (action.type) {
      case TOTAL_PURCHASE_ORDER_REQUEST:
        return { loading: true, };
  
      case TOTAL_PURCHASE_ORDER_SUCCESS:
        return { loading: false, totalpurchaseOrders: action.payload };
  
      case TOTAL_PURCHASE_ORDER_FAIL:
        return { loading: false, totalpurchaseOrders: action.payload };
  
      default:
        return state;
    }
  };