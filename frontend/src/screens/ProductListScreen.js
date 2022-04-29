import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  createProduct,
  deleteProduct,
  listProducts,
} from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from '../constants/productConstants';

export default function ProductListScreen(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  let brandId;
  let priceMax;
  let priceMin;
  let categoryId;
  let featured;
  let inStock;
  let order;

  const productList = useSelector((state) => state.productList);
  const {loading, error, products, totalPages, page}= productList;
  const pageNumber = location.search.split('?page=')[1];
  const pages =[...Array(totalPages).keys()]

  console.log(pageNumber)
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      navigate(`/productlist`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts(brandId, priceMax, priceMin, categoryId, featured, inStock, order,pageNumber))
  }, [
    createdProduct,
    dispatch,
    navigate,
    successCreate,
    successDelete,
    userInfo.id,
    pageNumber
  ]);

  const deleteHandler = (product) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteProduct(product.id));
    }
  };
  const createHandler = () => {
    navigate(`/product/create`)
  };
  return (
    <div className='container'>
      <div className="row">
        <h1>Products</h1>
        <button type="button" className=" primary" style={{padding: '15px', borderRadius:'.5rem', margin:'15px', position:'absolute', right:'0px'}} onClick={createHandler}>
          Create Product
        </button>
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>FEATURED</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.product_name}</td>
                  <td>{product.price}</td>
                  <td>{String(product.featured)}</td>
                  <td>{product.category.category_name}</td>
                  <td>{product.brand.brand_name}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() => navigate(`/product/${product.id}/edit`)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="box">
                  <ul className="pagination">
                  <li><Link to={`/productlist?page=${page-1}`}><i className="bx bxs-chevron-left" /></Link></li>

                {
                  pages.map((x)=>(
                    
                      <li ><Link
                            className={x + 1 === page ? 'active' : ''}
                            key={x + 1}
                            to={`/productlist?page=${x+1}`}
                          >
                            {x+1}
                        </Link>
                      </li>

                    

                  ))
                }
                  <li><Link to={`/productlist?page=${page+1}`}><i className="bx bxs-chevron-right" /></Link></li>

                    
                  </ul>
          </div>
        
        </>
      )}
    </div>
  );
}
