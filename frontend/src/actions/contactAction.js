import { CONTACT_CREATE_FAIL, CONTACT_CREATE_REQUEST, CONTACT_CREATE_SUCCESS, CONTACT_LIST_REQUEST, CONTACT_LIST_SUCCESS, CONTACT_LIST_FAIL, CONTACT_DELETE_REQUEST, CONTACT_DELETE_SUCCESS, CONTACT_DELETE_FAIL } from "../constants/contactConstant";
import  Axios  from "axios";


export const createContact=({name,email,subject, message})=> async(dispatch)=>{
    console.log(1)
    dispatch({type: CONTACT_CREATE_REQUEST})
    try{
        const {data}= await Axios.post('/api/contacts/', {name,email,subject, message})
        dispatch({
            type: CONTACT_CREATE_SUCCESS,
            payload: data
        })
        console.log(data)
    }catch(error){
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: CONTACT_CREATE_FAIL, payload: message });
    }

}
export const listContact = (page)=> async(dispatch)=>{
    dispatch({
        type: CONTACT_LIST_REQUEST
    });
    try{
        const {data}= await Axios.get('/api/contacts',
        {
          params: {page: `${page}`}
        }
        );
        dispatch({
            type: CONTACT_LIST_SUCCESS,
            payload: data, 
        })
        // console.log(data)
        // console.log(data.totalPages)

    }catch(error){
        dispatch({
            type: CONTACT_LIST_FAIL,
            payload: error.message
        })
    }
};
export const deleteContact = (contactId) => async (dispatch, getState) => {
    dispatch({ type: CONTACT_DELETE_REQUEST, payload: contactId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      await Axios.delete(`/api/contacts/${contactId}`, 
    //   {
    //     headers: { Authorization: `Bearer ${userInfo.token}` },
    //   }
      );
      dispatch({ type: CONTACT_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: CONTACT_DELETE_FAIL, payload: message });
    }
  };