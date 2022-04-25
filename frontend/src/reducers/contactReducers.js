import { CONTACT_CREATE_FAIL, CONTACT_CREATE_REQUEST, CONTACT_CREATE_RESET, CONTACT_CREATE_SUCCESS, CONTACT_DELETE_FAIL, CONTACT_DELETE_REQUEST, CONTACT_DELETE_RESET, CONTACT_DELETE_SUCCESS, CONTACT_LIST_FAIL, CONTACT_LIST_REQUEST, CONTACT_LIST_SUCCESS } from "../constants/contactConstant";

export const contactCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case CONTACT_CREATE_REQUEST:
        return { loading: true };
      case CONTACT_CREATE_SUCCESS:
        return { loading: false, success: true, contact: action.payload };
      case CONTACT_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case CONTACT_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  export const contactListReducer=(state={loading:true, contacts:[], totalPages:{}, page:''}, action) => {
    switch (action.type) {
        case CONTACT_LIST_REQUEST:
            return {loading: true};
        case CONTACT_LIST_SUCCESS:
            return {loading: false, contacts: action.payload, totalPages: action.payload.totalPages, page: action.payload.page};
        case CONTACT_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
};
export const contactDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CONTACT_DELETE_REQUEST:
      return { loading: true };
    case CONTACT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CONTACT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case CONTACT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};