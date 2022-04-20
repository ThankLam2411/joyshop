import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listBlog } from "../actions/blogAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import parse from 'html-react-parser';
const BlogScreen = ()=>{
    const dispatch = useDispatch();
    const blogList = useSelector((state) => state.blogList);
    const {loading, error, blogs}= blogList;
    const parse = require('html-react-parser');
  const [ele,setEle] = useState();
 
    useEffect(()=>{
        dispatch(listBlog())
    },[dispatch])

    useEffect(()=>{
     if(blogs !== undefined){

       console.log(blogs.length!==0 ? blogs[3].blog_content : '');
      
     }
  },[blogs])
    return(
<section className="blog-posts grid-system">
  <div className="container">
    <div className="row">
      <div className="c-12">
        <div className="all-blog-posts">
        {loading?<LoadingBox></LoadingBox>:
          error?<MessageBox variant="danger">{error}</MessageBox>:
          (
          <div className="row">

              {blogs.map((blog) =>(
                <div className="l-6 m-12">
                    <div className="blog-post">
                        <div className="blog-thumb">
                            <img className="medium" src={blog.product.image}/>
                        </div>
                        <div className="down-content">
                            <span>{blog.blog_title}</span>
                            <hr />
                            <Link to={`/product/${blog.product.id}`}><h4>{blog.product.product_name}</h4></Link>
                            <ul className="post-info">
                              <li><a href="#">Admin</a></li>
                              <li><a href="#">{blog?.createdAt?.substring(0, 10) || blog?.updatedAt?.substring(0, 10)}</a></li>
                            </ul>
                            <p>{parse(blog.blog_content)}</p>
                           
                          </div>
                        </div>
                </div>
              ))}
            {/* <div className="col-lg-6">
              <div className="blog-post">
                <div className="blog-thumb">
                  <img src="assets/images/blog-thumb-01.jpg" alt />
                </div>
                <div className="down-content">
                  <span>Lifestyle</span>
                  <a href="post-details.html"><h4>Donec tincidunt leo</h4></a>
                  <ul className="post-info">
                    <li><a href="#">Admin</a></li>
                    <li><a href="#">May 31, 2020</a></li>
                    <li><a href="#">12 Comments</a></li>
                  </ul>
                  <p>Nullam nibh mi, tincidunt sed sapien ut, rutrum hendrerit velit. Integer auctor a mauris sit amet eleifend.</p>
                  <div className="post-options">
                    <div className="row">
                      <div className="col-lg-12">
                        <ul className="post-tags">
                          <li><i className="fa fa-tags" /></li>
                          <li><a href="#">Best Templates</a>,</li>
                          <li><a href="#">TemplateMo</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="blog-post">
                <div className="blog-thumb">
                  <img src="assets/images/blog-thumb-02.jpg" alt />
                </div>
                <div className="down-content">
                  <span>Lifestyle</span>
                  <a href="post-details.html"><h4>Suspendisse et metus</h4></a>
                  <ul className="post-info">
                    <li><a href="#">Admin</a></li>
                    <li><a href="#">May 22, 2020</a></li>
                    <li><a href="#">26 Comments</a></li>
                  </ul>
                  <p>Nullam nibh mi, tincidunt sed sapien ut, rutrum hendrerit velit. Integer auctor a mauris sit amet eleifend.</p>
                  <div className="post-options">
                    <div className="row">
                      <div className="col-lg-12">
                        <ul className="post-tags">
                          <li><i className="fa fa-tags" /></li>
                          <li><a href="#">Best Templates</a>,</li>
                          <li><a href="#">TemplateMo</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="blog-post">
                <div className="blog-thumb">
                  <img src="assets/images/blog-thumb-03.jpg" alt />
                </div>
                <div className="down-content">
                  <span>Lifestyle</span>
                  <a href="post-details.html"><h4>Donec tincidunt leo</h4></a>
                  <ul className="post-info">
                    <li><a href="#">Admin</a></li>
                    <li><a href="#">May 18, 2020</a></li>
                    <li><a href="#">42 Comments</a></li>
                  </ul>
                  <p>Nullam nibh mi, tincidunt sed sapien ut, rutrum hendrerit velit. Integer auctor a mauris sit amet eleifend.</p>
                  <div className="post-options">
                    <div className="row">
                      <div className="col-lg-12">
                        <ul className="post-tags">
                          <li><i className="fa fa-tags" /></li>
                          <li><a href="#">Best Templates</a>,</li>
                          <li><a href="#">TemplateMo</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="blog-post">
                <div className="blog-thumb">
                  <img src="assets/images/blog-thumb-04.jpg" alt />
                </div>
                <div className="down-content">
                  <span>Lifestyle</span>
                  <a href="post-details.html"><h4>Mauris ac dolor ornare</h4></a>
                  <ul className="post-info">
                    <li><a href="#">Admin</a></li>
                    <li><a href="#">May 16, 2020</a></li>
                    <li><a href="#">28 Comments</a></li>
                  </ul>
                  <p>Nullam nibh mi, tincidunt sed sapien ut, rutrum hendrerit velit. Integer auctor a mauris sit amet eleifend.</p>
                  <div className="post-options">
                    <div className="row">
                      <div className="col-lg-12">
                        <ul className="post-tags">
                          <li><i className="fa fa-tags" /></li>
                          <li><a href="#">Best Templates</a>,</li>
                          <li><a href="#">TemplateMo</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="blog-post">
                <div className="blog-thumb">
                  <img src="assets/images/blog-thumb-05.jpg" alt />
                </div>
                <div className="down-content">
                  <span>Lifestyle</span>
                  <a href="post-details.html"><h4>Donec tincidunt leo</h4></a>
                  <ul className="post-info">
                    <li><a href="#">Admin</a></li>
                    <li><a href="#">May 12, 2020</a></li>
                    <li><a href="#">16 Comments</a></li>
                  </ul>
                  <p>Nullam nibh mi, tincidunt sed sapien ut, rutrum hendrerit velit. Integer auctor a mauris sit amet eleifend.</p>
                  <div className="post-options">
                    <div className="row">
                      <div className="col-lg-12">
                        <ul className="post-tags">
                          <li><i className="fa fa-tags" /></li>
                          <li><a href="#">Best Templates</a>,</li>
                          <li><a href="#">TemplateMo</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="blog-post">
                <div className="blog-thumb">
                  <img src="assets/images/blog-thumb-06.jpg" alt />
                </div>
                <div className="down-content">
                  <span>Lifestyle</span>
                  <a href="post-details.html"><h4>Mauris ac dolor ornare</h4></a>
                  <ul className="post-info">
                    <li><a href="#">Admin</a></li>
                    <li><a href="#">May 10, 2020</a></li>
                    <li><a href="#">3 Comments</a></li>
                  </ul>
                  <p>Nullam nibh mi, tincidunt sed sapien ut, rutrum hendrerit velit. Integer auctor a mauris sit amet eleifend.</p>
                  <div className="post-options">
                    <div className="row">
                      <div className="col-lg-12">
                        <ul className="post-tags">
                          <li><i className="fa fa-tags" /></li>
                          <li><a href="#">Best Templates</a>,</li>
                          <li><a href="#">TemplateMo</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <ul className="page-numbers">
                <li><a href="#">1</a></li>
                <li className="active"><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#"><i className="fa fa-angle-double-right" /></a></li>
              </ul>
            </div> */}
          </div>
          )}
        </div>
      </div>
     
    </div>
  </div>
</section>

    )
}
export default BlogScreen;