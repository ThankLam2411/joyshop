import Axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { listBrand } from '../actions/brandActions';
import { signout } from '../actions/userActions';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menu = useRef();
  const [keyword, setKeyword] = useState('');
  const [active, setActive] = useState(false);
  const handleOnChangeInput = (e) => {
    const { value } = e.target;
    setKeyword(value)
  }
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${keyword}`)

  }
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const brandList = useSelector((state) => state.brandList)
  const { loading, error, brands } = brandList;
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const signoutHandler = () => {
    dispatch(signout())

  }

  useEffect(() => {
    dispatch(listBrand())
  }, [dispatch]);
  return (
    <header>
      {/* mobile menu */}
      <div className="mobile-menu bg-second">
        <Link to="/" className="mb-logo ">JOYSHOP</Link>
        <ul className="user-menu-mobile ">
          {/* <div className="row" style={{display: 'flex', justifyContent:'space-between', alignItems: 'center'}}> */}

          <li ><Link to="#"><i className="bx bx-bell" /></Link></li>


          <li className="dropdown-header" style={{}}>

            {
              userInfo ? (
                <div style={{ display: 'flex' }}>
                {!userInfo.user_image  ? (<i className="bx bx-user-circle" />):(
                                <img className="user-image" src={userInfo.user_image}/>
                  )} 
                  <div className="dropdown-header">
                    <ul className="dropdown-header-content">
                      <div className="user_info" style={{  width:'100%'}} to="#">
                        {userInfo.user_name}
                      </div>
                      <div  style={{ borderBottom: '1px solid #d3d3d3', width:'100%', fontSize:'1rem'}} to="#">
                        {userInfo.user_email}
                      </div>
                      
                      <li >
                        <Link to="/profile" >User Profile</Link>
                      </li>
                      <li >
                        <Link to="/orderhistory">Order History</Link>
                      </li>

                      {userInfo && userInfo.isAdmin && (
                        <>
                          <div style={{ borderBottom: '1px solid #d3d3d3', width:'100%', fontSize:'2rem', fontWeight:'500'}}>Admin</div>
                          <li>
                            <Link to="/dashboard">Dashboard</Link>
                          </li>
                          <li>
                            <Link to="/productlist">Products</Link>
                          </li>
                          <li>
                            <Link to="/orderlist">Orders</Link>
                          </li>
                          <li>
                            <Link to="/userlist">Users</Link>
                          </li>
                          <li>
                            <Link to="/bloglist">Blogs</Link>
                          </li>
                          <li>
                            <Link to="/contactlist">Contacts</Link>
                          </li>
                          <li>
                            <Link to="/commentlist">Comments</Link>
                          </li>
                          <hr/>
                        </>
                      )}
                      <li >
                        <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                      </li>

                    </ul>
                  </div>
                </div>



              ) : (
                <ul className="dropdown-header-content">
                  <li className="dropdown-header-item">
                    <Link to="/signin">Sign In</Link>
                  </li>
                </ul>

              )
            }
            


          </li>

          <li><Link to="/cart"><i className="bx bx-cart" />
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
          </Link></li>
          {/* </div> */}
        </ul>
        <span className="mb-menu-toggle " id="mb-menu-toggle" onClick={() => { setActive(!active); console.log(123); }}>
          <i className="bx bx-menu" />
        </span>
        {/* <div className="l-4 m-12 "> */}


      </div>
      {/* </div> */}
      {/* end mobile menu */}
      {/* main header */}
      <div className={!active ? "header-wrapper" : "header-wrapper active"} id="header-wrapper"  >
        <span className="mb-menu-toggle mb-menu-close" id="mb-menu-close" onClick={() => { setActive(!active); console.log(123); }}>

          <i className="bx bx-x" />
        </span>
        {/* top header */}
        <div className="bg-second">
          <div className="top-header container">
            <ul className="devided">
              <li>
                <a href="tel:+84968588806" title="Give me a call">+84968588806</a>
              </li>
              <li>
              <a href="mailto:thanhlam241120@gmail.com" title="Send me an email">thanhlam241120@gmail.com</a>
              </li>
            </ul>
            {/* <ul className="devided">
              <li><h2>FREESHIP</h2></li>
              <li><h2>AUTHENTIC</h2></li>
              <li><h2>HIGH QUALITY</h2></li>

            </ul> */}
          </div>
        </div>

        {/* mid header */}
        <div className="bg-main">
          <div className="mid-header container">
            <div className="row">
              <div className="c-2 m-2 ">
                <Link to="/" className="logo">JOYSHOP</Link>
              </div>
              <div className="l-6 m-10">
                <form >
                  <div className="search">
                    <input
                      type="text"
                      placeholder="Search"
                      onChange={handleOnChangeInput}
                      value={keyword} />
                    <i onClick={handleSearch} className="bx bx-search-alt" />
                  </div>
                </form>
              </div>
              <div className="l-4 m-12 ">
                <ul className="user-menu ">
                  {/* <div className="row" style={{display: 'flex', justifyContent:'space-between', alignItems: 'center'}}> */}

                  <li ><Link to="#"><i className="bx bx-bell" /></Link></li>

                  <li className="dropdown-header" style={{}}><Link to="#">

                    {/* {userInfo  ? (<img className="user-image" src={userInfo?.user_image}/>):(
                            <i className="bx bx-user-circle" />
                          )} */}

                    {
                      userInfo ? (
                        <div style={{ display: 'flex' }}>
                        {!userInfo.user_image  ? (<i className="bx bx-user-circle" />):(
                                        <img className="user-image" src={userInfo.user_image}/>
                          )} 
                          <div className="dropdown-header">
                            <ul className="dropdown-header-content">
                              <div className="user_info" style={{  width:'100%'}} to="#">
                                {userInfo.user_name}
                              </div>
                              <div  style={{ borderBottom: '1px solid #d3d3d3', width:'100%', fontSize:'1rem'}} to="#">
                                {userInfo.user_email}
                              </div>
                              
                              <li >
                                <Link to="/profile" >User Profile</Link>
                              </li>
                              <li >
                                <Link to="/orderhistory">Order History</Link>
                              </li>

                              {userInfo && userInfo.isAdmin && (
                                <>
                                  <div style={{ borderBottom: '1px solid #d3d3d3', width:'100%', fontSize:'2rem', fontWeight:'500'}}>Admin</div>
                                  <li>
                                    <Link to="/dashboard">Dashboard</Link>
                                  </li>
                                  <li>
                                    <Link to="/productlist">Products</Link>
                                  </li>
                                  <li>
                                    <Link to="/orderlist">Orders</Link>
                                  </li>
                                  <li>
                                    <Link to="/userlist">Users</Link>
                                  </li>
                                  <li>
                                    <Link to="/bloglist">Blogs</Link>
                                  </li>
                                  <li>
                                    <Link to="/contactlist">Contacts</Link>
                                  </li>
                                  <li>
                                    <Link to="/commentlist">Comments</Link>
                                  </li>
                                  <hr/>
                                </>
                              )}
                              <li >
                                <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                              </li>

                            </ul>
                          </div>
                        </div>

                      ) : (
                        <>
                          <i className="bx bx-user-circle" />

                          <ul className="dropdown-header-content">
                            <li className="dropdown-header-item">
                              <Link to="/signin">Sign In</Link>
                            </li>
                          </ul>

                        </>

                      )}
                  

                  </Link></li>

                  <li><Link to="/cart"><i className="bx bx-cart" />
                    {cartItems.length > 0 && (
                      <span className="badge">{cartItems.length}</span>
                    )}
                  </Link></li>
                  {/* </div> */}
                </ul>

              </div>
            </div>
          </div>
        </div>
        {/* end mid header */}
        {/* bottom header */}
        <div className="bg-second">
          <div className="bottom-header container">
            <ul className="main-menu">
              <li><Link to="/">home</Link></li>
              {/* mega menu */}
              <li className="mega-dropdown">
                <Link to="/listproductall">Shop<i className="bx bxs-chevron-down" /></Link>
                {loading ? <LoadingBox></LoadingBox> :
                  error ? <MessageBox variant="danger">{error}</MessageBox> :
                    (
                      <div className="mega-content">
                        <div className="row">

                          {
                            brands.map((brand) => (
                              <div className="col-3 col-md-12">
                                <div className="box">
                                  <h3><Link to={`/listproduct/${brand.id}`} key={brand.id}>{brand.brand_name}</Link></h3>
                                </div>
                              </div>
                            ))
                          }

                        </div>
                        <div className="row img-row">
                          {
                            brands.map(brand => (
                              <div className="col-3">
                                <div className="box">
                                  <img src={brand.brand_image} alt="" />
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    )}
              </li>
              {/* end mega menu */}
              <li><a href="/blog">blog</a></li>
              <li><Link to="/contact">contact</Link></li>
            </ul>
          </div>
        </div>
        {/* end bottom header */}
      </div>
      {/* end main header */}
    </header>
  )
}
export default Header;