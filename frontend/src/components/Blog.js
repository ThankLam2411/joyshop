import  Axios  from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
const Blog =()=>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [blog1, setBlog1]= useState({});
  const [blog2, setBlog2]= useState({});

  useEffect(() => {
    async function getBlogDetails1(){
      let data = await Axios.get('/api/blogs/1');
      let blog = data.data;
      setBlog1(blog);
      // setBlogTitle(blog.blog_title);
      // setBlogContent(blog.blog_content);
      // setProductId(blog.product_id)
      return blog;

    }
    getBlogDetails1()

    
  },[])
  useEffect(() => {
    async function getBlogDetails2(){
      let data = await Axios.get(`/api/blogs/2`);
      let blog = data.data;
      setBlog2(blog);
      // setBlogTitle(blog.blog_title);
      // setBlogContent(blog.blog_content);
      // setProductId(blog.product_id)
      return blog;

    }
    getBlogDetails2()
  },[])
  console.log(blog2)

    return(
      <div className="section">
        <div className="container">
          <div className="section-header">
            <h2>latest blog</h2>
          </div>
          <div className="blog">
            <div className="blog-img">
              <img src={blog1?.product?.image || blog1?.image } alt="" />
            </div>
            <div className="blog-info">
              <div className="blog-title">
                {blog1.blog_title}
              </div>
              <div className="blog-preview">
                {blog1.blog_content}
              </div>
              <button className="btn-flat btn-hover">read more</button>
            </div>
          </div>
          <div className="blog row-revere">
          <div className="blog-img">
              <img src={blog2?.product?.image || blog2?.image } alt="" />
            </div>
            <div className="blog-info">
              <div className="blog-title">
                {blog2.blog_title}
              </div>
              <div className="blog-preview">
                {blog2.blog_content}
              </div>
              <button className="btn-flat btn-hover">read more</button>
            </div>
          </div>
          <div className="section-footer">
            <Link to="#" className="btn-flat btn-hover">view all</Link>
          </div>
        </div>
  </div>
    )
}
export default Blog;



// import { styled } from '@mui/material/styles';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
// import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import { red } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {listBlog} from '../actions/blogAction';
// import  Axios  from "axios";
// import LoadingBox from './LoadingBox';
// import MessageBox from './MessageBox';



// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(280deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

// export default function Blog() {
//   const dispatch = useDispatch();
//   const [expanded, setExpanded] =useState(false);

//   const blogList = useSelector((state) => state.blogList);
//   const {loading, error, blogs}= blogList;
//   useEffect(()=>{
//     dispatch(listBlog())

//   },[dispatch])
//   // const [blogs, setBlogs]= useState([])
//   // useEffect(()=>{
//   //   async function listBlog() {
//   //     let res = await Axios.get('/api/blogs');
//   //     let blogs = res.data;
//   //     setBlogs(blogs)
//   //   }
//   //   listBlog();
//   // },[])
//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//   return (
//   <>
//   <div id="blog" className="section-header">
//       <h2>latest blog</h2>
//   </div>
//   {loading?<LoadingBox></LoadingBox>:
//           error?<MessageBox variant="danger">{error}</MessageBox>:
//           (
//   <div className="row">
 
//     {
//       blogs.map(blog =>(
//         <Card sx={{ maxWidth: 345 }} className="col-4">
//       <CardHeader
//         avatar={
//           <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
//             R
//           </Avatar>
//         }
//         action={
//           <IconButton aria-label="settings">
//             <MoreVertIcon />
//           </IconButton>
//         }
//         title={blog.blog_title}
//         subheader={blog?.createdAt?.substring(0, 10) || blog?.updatedAt?.substring(0, 10)}
//       />
//       <CardMedia
//         component="img"
//         height="194"
//         image={blog.product.image}
//         alt="Paella dish"
//       />
//       <CardContent>
//         <Typography variant="body2" color="text.secondary">
//           {blog.blog_content}
//         </Typography>
//       </CardContent>
//       <CardActions disableSpacing>
//         <IconButton aria-label="add to favorites">
//           <FavoriteIcon />
//         </IconButton>
//         <IconButton aria-label="share">
//           <ShareIcon />
//         </IconButton>
//         <ExpandMore
//           expand={expanded}
//           onClick={handleExpandClick}
//           aria-expanded={expanded}
//           aria-label="show more"
//         >
//           <ExpandMoreIcon />
//         </ExpandMore>
//       </CardActions>
//     </Card>
//       ))
//     }
//     {/* <Card sx={{ maxWidth: 345 }} className="col-4">
//       <CardHeader
//         avatar={
//           <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
//             R
//           </Avatar>
//         }
//         action={
//           <IconButton aria-label="settings">
//             <MoreVertIcon />
//           </IconButton>
//         }
//         title="Shrimp and Chorizo Paella"
//         subheader="September 14, 2016"
//       />
//       <CardMedia
//         component="img"
//         height="194"
//         image="/static/images/cards/paella.jpg"
//         alt="Paella dish"
//       />
//       <CardContent>
//         <Typography variant="body2" color="text.secondary">
//           This impressive paella is a perfect party dish and a fun meal to cook
//           together with your guests. Add 1 cup of frozen peas along with the mussels,
//           if you like.
//         </Typography>
//       </CardContent>
//       <CardActions disableSpacing>
//         <IconButton aria-label="add to favorites">
//           <FavoriteIcon />
//         </IconButton>
//         <IconButton aria-label="share">
//           <ShareIcon />
//         </IconButton>
//         <ExpandMore
//           expand={expanded}
//           onClick={handleExpandClick}
//           aria-expanded={expanded}
//           aria-label="show more"
//         >
//           <ExpandMoreIcon />
//         </ExpandMore>
//       </CardActions>
//     </Card>

//     <Card sx={{ maxWidth: 345 }} className="col-4">
//       <CardHeader
//         avatar={
//           <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
//             R
//           </Avatar>
//         }
//         action={
//           <IconButton aria-label="settings">
//             <MoreVertIcon />
//           </IconButton>
//         }
//         title="Shrimp and Chorizo Paella"
//         subheader="September 14, 2016"
//       />
//     <CardMedia
//       component="img"
//       height="194"
//       image="/static/images/cards/paella.jpg"
//       alt="Paella dish"
//     />
//     <CardContent>
//       <Typography variant="body2" color="text.secondary">
//         This impressive paella is a perfect party dish and a fun meal to cook
//         together with your guests. Add 1 cup of frozen peas along with the mussels,
//         if you like.
//       </Typography>
//     </CardContent>
//     <CardActions disableSpacing>
//       <IconButton aria-label="add to favorites">
//         <FavoriteIcon />
//       </IconButton>
//       <IconButton aria-label="share">
//         <ShareIcon />
//       </IconButton>
//       <ExpandMore
//         expand={expanded}
//         onClick={handleExpandClick}
//         aria-expanded={expanded}
//         aria-label="show more"
//       >
//         <ExpandMoreIcon />
//       </ExpandMore>
//     </CardActions>
//   </Card>
//   <Card sx={{ maxWidth: 345 }} className="col-4">
//       <CardHeader
//         avatar={
//           <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
//             R
//           </Avatar>
//         }
//         action={
//           <IconButton aria-label="settings">
//             <MoreVertIcon />
//           </IconButton>
//         }
//         title="Shrimp and Chorizo Paella"
//         subheader="September 14, 2016"
//       />
//       <CardMedia
//         component="img"
//         height="194"
//         image="/static/images/cards/paella.jpg"
//         alt="Paella dish"
//       />
//       <CardContent>
//         <Typography variant="body2" color="text.secondary">
//           This impressive paella is a perfect party dish and a fun meal to cook
//           together with your guests. Add 1 cup of frozen peas along with the mussels,
//           if you like.
//         </Typography>
//       </CardContent>
//       <CardActions disableSpacing>
//         <IconButton aria-label="add to favorites">
//           <FavoriteIcon />
//         </IconButton>
//         <IconButton aria-label="share">
//           <ShareIcon />
//         </IconButton>
//         <ExpandMore
//           expand={expanded}
//           onClick={handleExpandClick}
//           aria-expanded={expanded}
//           aria-label="show more"
//         >
//           <ExpandMoreIcon />
//         </ExpandMore>
//       </CardActions>
//     </Card> */}
//   </div>
//           )}
//   </>
//   );
// }