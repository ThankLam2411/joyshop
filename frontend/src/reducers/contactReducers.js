import { CONTACT_CREATE_FAIL, CONTACT_CREATE_REQUEST, CONTACT_CREATE_RESET, CONTACT_CREATE_SUCCESS } from "../constants/contactConstant";

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