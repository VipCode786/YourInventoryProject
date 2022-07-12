import { GET_PRODUCTLIST_REQUEST, GET_PRODUCTLIST_SUCCESS , GET_PRODUCTLIST_FAIL } from "../constants/productListConstants";

  export const productListReducer = (state = { productLists: [] }, action) => {
    switch (action.type) {
      case GET_PRODUCTLIST_REQUEST:
        return { loading: true, productLists: [] };
  
      case GET_PRODUCTLIST_SUCCESS:
        return { loading: false, productLists: action.payload };
  
      case GET_PRODUCTLIST_FAIL:
        return { loading: false, productLists: action.payload };
  
      default:
        return state;
    }
  };