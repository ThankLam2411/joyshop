import { useSelector,useDispatch } from 'react-redux';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { commentsByProductId } from '../actions/commentActions';

const Comment =()=>{
    const dispatch = useDispatch();
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const [comment, setComment] = useState('');
    const {id: productId}= useParams();
    console.log(productId);
    const commentsList= useSelector((state) => state.commentsList);
    const {loading, error, comments}= commentsList;
    console.log(comments)
    useEffect(()=>{
        dispatch(commentsByProductId(productId));
    },[dispatch, productId]);

    return(
        <>
            {/* <div className="row">       
                <div className="user-rate">
                    <div className="user-info">
                        <div className="user-avt">
                            <i className="bx bx-user-circle" />
                        </div>
                        <div className="user-name">
                            <span className="name">{userInfo.user_name}</span>
                            <span className="rating">{userInfo.user_email}</span>
                        </div>
                        <div>
                            <input type="text" placeholder="Write something about product..." value={comment} onChange={(e) => setComment(e.target.value)} style={{    marginLeft: '20px',width: '50rem'}}/>
                        </div>
                    </div>
                
                </div>
            </div> */}
             {comments.map((comment) =>(
                        <div className="user-rate">
                            <div className="user-info">
                                <div className="user-avt">
                                    <i className="bx bx-user-circle" />
                                </div>
                                <div className="user-name">
                                <span className="name">{comment.user.user_name}</span>
                                <span className="rating">
                                    <i className="bx bxs-star" />
                                    <i className="bx bxs-star" />
                                    <i className="bx bxs-star" />
                                    <i className="bx bxs-star" />
                                    <i className="bx bxs-star" />
                                </span>
                                </div>
                            </div>
                            <div className="user-rate-content">
                                {comment.comment_content}
                            </div>
                    </div>
                  
                    ))}
                    
        </>
    )
}
export default Comment;