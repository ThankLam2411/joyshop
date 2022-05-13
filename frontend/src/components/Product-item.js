import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../actions/cartActions";

const ProductItem=({product})=>{
  const navigate = useNavigate()
  const addToCartHandler=()=>{
      navigate(`/cart/${product.id}?qty=1`)
  }

    return(
        <div className="col-3 col-md-6 col-sm-12">
        <div className="product-card">
          <div className="product-card-img">
            <img src={product.image} alt="" />
          </div>
          <div className="product-card-info">
            <div className="product-btn">
              <a href={`/product/${product.id}`} className="btn-flat btn-hover btn-shop-now">mua ngay</a>
              {product.countInStock ===0 ?(<span></span>):(
                  <button className="btn-flat btn-hover btn-cart-add" onClick={addToCartHandler}>
                  <i className="bx bxs-cart-add" />
                  </button>
              )}
             
              {/* <a href='#' className="btn-flat btn-hover btn-cart-add">
                <i className="bx bxs-heart" />
              </a> */}
            </div>
            <div className="product-card-name">
              {product.name}
            </div>
            <div className="product-card-price">
              <span><del>${product.old_price}</del></span>
              <span className="curr-price">${product.price}</span>
            </div>
          </div>
        </div>
      </div>
    )
}
export default ProductItem;