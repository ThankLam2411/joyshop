import { BLOG_DETAILS_FAIL, BLOG_DETAILS_REQUEST, BLOG_DETAILS_SUCCESS, BLOG_LIST_FAIL, BLOG_LIST_REQUEST, BLOG_LIST_SUCCESS, BLOG_UPDATE_FAIL, BLOG_UPDATE_REQUEST, BLOG_UPDATE_RESET, BLOG_UPDATE_SUCCESS } from "../constants/blogConstants";

export const blogListReducer=(state={loading: true, blogs:[]},action) => {
    switch (action.type) {
        case BLOG_LIST_REQUEST:
            return {loading: true}
        case BLOG_LIST_SUCCESS:
            return {loading: false, blogs: action.payload}
        case BLOG_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export const blogDetailsReducer = (state={blog:[], loading: true}, action) =>{
    switch (action.type) {
        case BLOG_DETAILS_REQUEST:
            return {loading: true};
        case BLOG_DETAILS_SUCCESS:
                return {loading: false, blog: action.payload};
        case BLOG_DETAILS_FAIL:
                return {loading: false, error: action.payload}
        default:
            return state;
    }
};
export const blogUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case BLOG_UPDATE_REQUEST:
        return { loading: true };
      case BLOG_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case BLOG_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case BLOG_UPDATE_RESET:
        return {};
      default:
        return state;
    }
  };