import { useSelector,useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {detailsProduct} from '../actions/productActions';
import Comment from '../components/Comment';
import { commentsByProductId, postComment } from '../actions/commentActions';
import Axios  from 'axios';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { Avatar, Grid, Paper, Typography } from '@mui/material';
import RatingStar from '../components/Rating';
import dateFormat from 'dateformat';

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };
const ProductScreen =()=>{
    const dispatch= useDispatch();
    const navigate = useNavigate()
    const {id:productId}= useParams();
    const parse = require('html-react-parser');

    const [qty,setQty]= useState(1);
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product}= productDetails;   

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const userId= userInfo?.id;
    console.log('id',userId);
  
    // const product = data.products.find((x)=> Number(x._id) === Number(id));
    const commentsList= useSelector((state) => state.commentsList);
    const {loading: loadingComments, error: errorComments, comments}= commentsList;
    // console.log(comments)
    const commentsCreate= useSelector((state) => state.commentsCreate);
    const {loading: loadingCommentCreate, error: errorCommentCreate, comment:commentCreate}= commentsCreate;
    const [comment_content, setComment]= useState('');
    const [rating, setRating]= useState(0);
    const [hover, setHover] = useState(-1);


    useEffect(()=>{
        dispatch(commentsByProductId(productId));
    },[dispatch, productId]);
 
    useEffect(()=>{
        dispatch(detailsProduct(productId))

    },[dispatch]);
    const addToCartHandler=()=>{
        navigate(`/cart/${productId}?qty=${qty}`)
    }

    const createCommentHandler=()=>{
        if(userId === undefined){
            window.alert('You must login to use this ')
            navigate('/signin')
        }
        if(rating === 0 || rating === undefined){
            window.alert('You must rate')
        }else{
            dispatch(postComment(comment_content, rating, productId))
        }

        

    }
    console.log(product);
    // if (product.product_description === undefined || product.product_description === 'undefined' || !product.product_description) return null;
    return(
    <>
       {loading?<LoadingBox></LoadingBox>:
          error?<MessageBox variant="danger">{error}</MessageBox>:
          (
            <div classname="bg-main">
            <div className="container">
                <div className="box">
                <div className="breadcumb">
                    <Link to="/">home</Link>
                    <span><i className="bx bxs-chevrons-right" /></span>
                    <a href="./products.html">all products</a>
                    <span><i className="bx bxs-chevrons-right" /></span>
                    {/* <a href="./product-detail.html">{product.product_name}</a> */}
                </div>
                </div>
                <div className="row product-row">
                <div className="col-5 col-md-12">
                    <div className="product-img" id="product-img">
                    <img src={product.image} alt="" />
                    </div>
                    <div className="box">
                    <div className="product-img-list">
                        <div className="product-img-item">
                            <img src={product.image} alt="" />
                        </div>
                        <div className="product-img-item">
                            <img src={product.image} alt="" />
                        </div>
                        <div className="product-img-item">
                            <img src={product.image} alt="" />
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-7 col-md-12">
                    <div className="product-info">
                    <h1>
                        {product.product_name}
                    </h1>
                    <div className="product-info-detail">
                        <span className="product-info-detail-title">Brand: </span>
                        <a href="#">{product.brand.brand_name}</a>
                    </div>
                    <div className="product-info-detail">
                        <span className="product-info-detail-title">Rated:</span>
                        <span className="rating">
                      
                        <Rating name="half-rating-read" value={product?.comments[0]?.rating}  precision={0.5} readOnly />
                        </span>
                    </div>
                    <div className="product-info-detail">
                        <span className="product-info-detail-title">Number of Reviews: </span>
                        <span className="rating">
                            {product?.comments[0]?.numReviews}
                        </span>
                    </div>
                    <p className="product-description">
                        {product.description}
                    </p>
                    <div className="product-info-price">${product.price}</div>
                        {product.countInStock > 0 ? (<span className="success">In Stock</span>):( <span className="danger">Unavailable</span>)}

                    <div className="product-quantity-wrapper">
                        <button onClick={() => setQty(qty - 1)} className="product-quantity-btn">
                        <i className="bx bx-minus" />
                        </button>
                        <span className="product-quantity">{qty}</span>
                        <button onClick={() => setQty(qty + 1)} disabled={product.countInStock >0 && qty >= product.countInStock} className="product-quantity-btn">
                         <i className="bx bx-plus" />
                        </button>
                    </div>
                    <div>
                        <button onClick = {addToCartHandler}  className="btn-flat btn-hover" disabled={product.countInStock===0} >add to cart</button>
                    </div>
                    </div>
                </div>
                </div>
                <div className="box">
                <div className="box-header">
                    description
                </div>
                <div className="product-detail-description">
                    <div className="product-detail-description-content">
                    <p>
                        {parse(product.product_description)}
                    </p>
                    </div>
                </div>
                </div>
                <div className="box">
                <div className="box-header">
                    review
                </div>
                {/* <Comment key={productId} productId={productId} /> */}
            <form className='' onSubmit={createCommentHandler}>
                    <div className="row">       
                        <div className="user-rate">
                            <div className="user-info">
                                <div className="user-avt">
                                    {userInfo? (<img src={userInfo?.user_image} style={{borderRadius:'50%', width:'60px', height:'60px'}}/>):(<i className="bx bx-user-circle" />)}
                                    
                                </div>
                                
                                <div className="user-name">
                                    <span className="name">{userInfo?.user_name}</span>
                                    <span className="rating">{userInfo?.user_email}</span>
                                </div>
                                <div>
                                    <input type="text" placeholder="Write something about product..." value={comment_content} onChange={(e) => setComment(e.target.value)} style={{marginLeft: '20px',width: '36rem'}}/>
                                </div>
                            
                            </div>
                        
                        </div>
                        
                    </div>
                    <Rating
                            name="hover-feedback"
                            value={rating}
                            precision={1}
                            // getLabelText={getLabelText}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);
                            }}
                            emptyIcon={<StarIcon style={{ opacity: 0.5 }} fontSize="inherit" />}
                            />
                            {rating !== null && (
                                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
                            )}
                <div>
                    <button type="submit"  className="btn-flat btn-hover">Post</button>
                </div>
            </form>
             {/* {comments?.map((comment) =>(
                 <div className="row">
                        <div className="user-rate c-6">
                            <div className="user-info">
                                <div className="user-avt">
                                {userInfo? (<img src={comment?.user?.user_image} style={{borderRadius:'50%', width:'60px', height:'60px'}}/>):(<i className="bx bx-user-circle" />)}

                                </div>
                                <div className="user-name">
                                    <span className="name">{comment?.user?.user_name}</span>
                                    <span className="rating"> 
                                        <Rating name="half-rating-read" value={comment.rating} defaultValue={2.5} precision={0.5} readOnly />
                                                                    
                                    </span>
                                </div>
                            </div>
                            <div className="user-rate-content c-6">
                                <div>{comment?.createdAt}</div>

                                <div>{comment?.comment_content}</div>
                            </div>
                      </div>
                    </div>
                  
                    ))} */}
             {comments?.map((comment) =>(
                 <>
                    <Paper style={{ padding: "40px 20px" }}>
                        <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar alt="Remy Sharp" src={comment?.user?.user_image} />
                        </Grid>

                        <Grid justifyContent="left" item xs zeroMinWidth>
                            <h4 style={{ margin: 0, textAlign: "left" }}>{comment?.user?.user_name}</h4>
                            <span>
                                <Rating name="half-rating-read" value={comment.rating} defaultValue={2.5} precision={0.5} readOnly />

                            </span>
                            <p style={{ textAlign: "left" }}>
                                {comment?.comment_content}
                            </p>
                            <p style={{ textAlign: "left", color: "gray" }}>
                            posted { dateFormat(comment?.createdAt, "mmmm dS, yyyy mm:ss")}
                            </p>
                        </Grid>
                        </Grid>
                        </Paper>
                    </>
                ))}
                


                 
                    {/* <div className="box">
                    <ul className="pagination">
                        <li><a href="#"><i className="bx bxs-chevron-left" /></a></li>
                        <li><a href="#" className="active">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li><a href="#">4</a></li>
                        <li><a href="#">5</a></li>
                        <li><a href="#"><i className="bx bxs-chevron-right" /></a></li>
                    </ul>
                    </div> */}
                </div>
                <div className="box">
                <div className="box-header">
                    related products
                </div>
                <div className="row" id="related-products" />
                </div>
            </div>
            </div>
             
            )}
       
        </>


    )
}
export default ProductScreen;