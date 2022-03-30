import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom"
import { listProductsByQuery } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ProductItem from "../components/Product-item";

const SearchScreen=()=>{
    const dispatch = useDispatch();
    const location= useLocation();
    const query = location.search.split('=')[1];
    const productListByQuery = useSelector((state) => state.productListByQuery);
    const {loading, error, products}= productListByQuery;
    console.log(query);
    useEffect(()=>{
        dispatch(listProductsByQuery(query))
    },[dispatch, query])
    return(
        <>
        <div className="section">
          <div className="container">
            <div className="section-header">
                <h2>Result with {query} </h2>
            </div>
            {loading?<LoadingBox></LoadingBox>:
          error?<MessageBox variant="danger">{error}</MessageBox>:
          (
              <div className="row" id="latest-products">
                  {
                    products.map((product,index) => (
                      <ProductItem key={product.id} product={product}></ProductItem>
                   ))}
              </div>
            )}
            
      
          </div>
        </div>
        </>
    )
}
export default SearchScreen