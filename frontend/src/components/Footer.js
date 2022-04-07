import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listBrand } from "../actions/brandActions";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

const Footer=()=>{
    const dispatch = useDispatch();
    const brandList = useSelector((state) => state.brandList)
    const {loading, error, brands} = brandList;

    useEffect(()=>{
        dispatch(listBrand())
      },[dispatch])
    return (
        <>
         <footer className="bg-second">
      <div className="container">
        <div className="row">
          <div className="col-3 col-md-6">
            <h3 className="footer-head">Products</h3>
            {loading?<LoadingBox></LoadingBox>:
            error?<MessageBox variant="danger">{error}</MessageBox>:
            (
            <ul className="menu">
                
            
                        {
                          brands.map((brand)=>(

                              <li><Link to={`/listproduct/${brand.id}`} key={brand.id}>{brand.brand_name}</Link></li>

                          ))
                        }
            </ul>
                
                      
                )}
                      
              {/* <li><Link to="#">YSL</Link></li>
              <li><Link to="#">Chanel</Link></li>
              <li><Link to="#"> Dior</Link></li>
              <li><Link to="#">Lancome</Link></li> */}
          </div>
          <div className="col-3 col-md-6">
            <h3 className="footer-head">services</h3>
            <ul className="menu">
              <li><Link to="/">Shopping </Link></li>
              <li><Link to="/orderhistory">Order History</Link></li>
              <li><Link to="#">product help</Link></li>
              <li><Link to="#">warranty</Link></li>
            </ul>
          </div>
          <div className="col-3 col-md-6">
            <h3 className="footer-head">support</h3>
            <ul className="menu">
              <li><Link to="#">Help center</Link></li>
              <li><Link to="/contact">Contact us</Link></li>
              <li><Link to="#">product help</Link></li>
              <li><Link to="#">warranty</Link></li>
              <li><Link to="#">order status</Link></li>
            </ul>
          </div>
          <div className="col-3 col-md-6 col-sm-12">
            <div className="contact">
              <h3 className="contact-header">
                JOYSHOP
              </h3>
              <ul className="contact-socials">
                <li><Link to="#">
                    <i className="bx bxl-facebook-circle" />
                  </Link></li>
                <li><Link to="#">
                    <i className="bx bxl-instagram-alt" />
                  </Link></li>
                <li><Link to="#">
                    <i className="bx bxl-youtube" />
                  </Link></li>
                <li><Link to="#">
                    <i className="bx bxl-twitter" />
                  </Link></li>
              </ul>
            </div>
            <div className="subscribe">
              <input type="email" placeholder="ENTER YOUR EMAIL" />
              <button>subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
        </>
    )
}
export default Footer;