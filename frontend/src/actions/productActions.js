import Axios from 'axios';
import {PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_LIST_QUERY_REQUEST, PRODUCT_LIST_QUERY_SUCCESS, PRODUCT_LIST_QUERY_FAIL, PRODUCT_LIST_CATEGORY_FAIL, PRODUCT_LIST_CATEGORY_REQUEST, PRODUCT_LIST_CATEGORY_SUCCESS, PRODUCT_LIST_FEATURED_REQUEST, PRODUCT_LIST_FEATURED_FAIL, PRODUCT_LIST_FEATURED_SUCCESS} from '../constants/productConstants';

export const listProducts = (brandId, priceMax, priceMin, categoryId, featured, inStock, order, pageNumber)=> async(dispatch)=>{
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });
    try{
        const {data}= await Axios.get('/api/products',{
          params: {
            page: `${pageNumber}`,
            category:`${categoryId}`,
            min:`${priceMin}`,
            max:`${priceMax}`,
            featured:`${featured}`,
            inStock: `${inStock}`,
            order: `${order}`
          }
        });
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data, 
        })
        console.log(data)
        console.log(data.totalPages)

    }catch(error){
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.message
        })
    }
};
export const listFeaturedProducts = (page)=> async(dispatch)=>{
  dispatch({
      type: PRODUCT_LIST_FEATURED_REQUEST
  });
  try{
      const {data}= await Axios.get('/api/products/featured',{
        params: {
          page: `${page}`
        }
      });
      dispatch({
          type: PRODUCT_LIST_FEATURED_SUCCESS,
          payload: data, 
      })
      console.log(data)
      console.log(data.totalPages)

  }catch(error){
      dispatch({
          type: PRODUCT_LIST_FEATURED_FAIL,
          payload: error.message
      })
  }
};
export const detailsProduct=(productId)=>async(dispatch)=>{
    dispatch({
        type: PRODUCT_DETAILS_REQUEST,
        payload: productId
    });
    try{
        const {data}= await Axios.get(`/api/products/${productId}`);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        });
    }catch(error){
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message :error.message,
        })
    }
}

export const createProduct = (product_name, image, countInStock, old_price, price,featured, product_description, category_id, brand_id) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        '/api/products', {product_name, image, countInStock, old_price, price,featured, product_description, category_id, brand_id},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: data.product,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_CREATE_FAIL, payload: message });
    }
  };

  export const deleteProduct = (productId) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      await Axios.delete(`/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: PRODUCT_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
    }
  };
  export const updateProduct = ({id, product_name, old_price, price, image, countInStock,featured, category_id, brand_id, product_description}) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: {id, product_name, old_price, price, image, countInStock,featured, category_id, brand_id, product_description} });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.patch(`/api/products/${id}`, { product_name, old_price, price, image, countInStock,featured, category_id, brand_id, product_description}, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_UPDATE_FAIL, error: message });
    }
  };

  export const listProductsByQuery = (query)=> async(dispatch)=>{
    dispatch({
        type: PRODUCT_LIST_QUERY_REQUEST
    });
    try{
        const {data}= await Axios.get(`/api/products/find`,{
          params:{
            q:`${query}`
          }
        });
        dispatch({
            type: PRODUCT_LIST_QUERY_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PRODUCT_LIST_QUERY_FAIL,
            payload: error.message
        })
    }
};

export const listProductByCategory=(brandId,categoryId) =>async(dispatch)=>{
  dispatch({type: PRODUCT_LIST_CATEGORY_REQUEST});
  try {
    const {data} = await Axios.get(`/api/brands/find/${brandId}`,{
      params:{
        q:`${categoryId}`
      }
    });
    console.log(data);
    dispatch({type: PRODUCT_LIST_CATEGORY_SUCCESS, payload: data})
    
  }catch (error) {
    dispatch({
      type: PRODUCT_LIST_CATEGORY_FAIL,
      error: error.message
    })
  }
}