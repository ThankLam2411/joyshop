import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteComment, getComments } from "../actions/commentActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { COMMENT_DELETE_RESET } from "../constants/commentConstants";



const ListCommmentScreen=()=> {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();


  const commentsListAll = useSelector((state) => state.commentsListAll);
  const {loading, error, comments}= commentsListAll;
  // const pageNumber = location.search.split('?page=')[1];
  // const pages =[...Array(totalPages).keys()]


  console.log(comments)


  const commentsDelete = useSelector((state) => state.commentsDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = commentsDelete;
  useEffect(() => {

    if (successDelete) {
      dispatch({ type: COMMENT_DELETE_RESET });
    }
    dispatch(getComments())

  //   dispatch(listContact(pageNumber))
  }, [
    dispatch,
    successDelete
  ]);

  const deleteHandler = (comment) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteComment(comment.id));
    }
  };
//   const createHandler = () => {
//     navigate(`/product/create`)
//   };
  return (
    <div>
      <div className="row">
        <h1>Comments</h1>
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
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
                <th>CONTENT</th>
                <th>RATING</th>
                <th>USER</th>
                <th>PRODUCT</th>
                <th>CREATED AT</th>
                <th>UPDATED AT</th>
                <th>ACTION</th>


              </tr>
            </thead>
            <tbody>
              {comments.comments.map((comment) => (
                <tr key={comment.id}>
                  <td>{comment.id}</td>
                  <td>{comment.comment_content}</td>
                  <td>{comment.rating}</td>
                  <td>{comment.user.user_name} </td>
                  <td><Link to={`/product/${comment.product.id}`} >{comment?.product?.product_name}</Link></td>
                  <td>{comment?.createdAt}</td>
                  <td>{comment.updatedAt}</td>

                  <td>
                  
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(comment)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        
        </>
      )}
    </div>
  );
}
export default ListCommmentScreen;
