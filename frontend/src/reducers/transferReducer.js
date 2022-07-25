import { PRODUCT_TRANSFER_FAIL, PRODUCT_TRANSFER_REQUEST, PRODUCT_TRANSFER_SUCCESS } from "../constants/transferConstant";

export const transferReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_TRANSFER_REQUEST:
        return { loading: true };
      case PRODUCT_TRANSFER_SUCCESS:
        return { loading: false, success: true, product: action.payload };
      case PRODUCT_TRANSFER_FAIL:
        return { loading: false, error: action.payload };
    //   case PRODUCT_CREATE_RESET:
    //     return {};
      default:
        return state;
    }
  };

