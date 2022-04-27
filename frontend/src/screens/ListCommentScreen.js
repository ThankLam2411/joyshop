import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getComments } from "../actions/commentActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";



const ListCommmentScreen=()=> {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();


  const commentsListAll = useSelector((state) => state.commentsListAll);
  const {loading, error, comments}= commentsListAll;
  // const pageNumber = location.search.split('?page=')[1];
  // const pages =[...Array(totalPages).keys()]


  console.log(comments)
  useEffect(()=>{
    dispatch(getComments())
  },[dispatch])

  // const contactDelete = useSelector((state) => state.contactDelete);
  // const {
  //   loading: loadingDelete,
  //   error: errorDelete,
  //   success: successDelete,
  // } = contactDelete;
  // useEffect(() => {
    // if (successCreate) {
    //   dispatch({ type: PRODUCT_CREATE_RESET });
    //   navigate(`/productlist`);
    // }
    // if (successDelete) {
    //   dispatch({ type: COMMENT_DELETE_RESET });
    // }
  //   dispatch(listContact(pageNumber))
  // }, [
  //   dispatch,
  //   navigate,
  //   pageNumber,
  //   successDelete
  // ]);

  // const deleteHandler = (contact) => {
  //   if (window.confirm('Are you sure to delete?')) {
  //     dispatch(deleteContact(contact.id));
  //   }
  // };
//   const createHandler = () => {
//     navigate(`/product/create`)
//   };
  return (
    <div>
      <div className="row">
        <h1>Comments</h1>
      </div>

      {/* {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>} */}
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
                  <td>{comment.user.user_name} (id: {comment.user_id})</td>
                  <td>{comment.product.product_name}</td>
                  <td>{comment.createdAt}</td>
                  <td>{comment.updatedAt}</td>

                  <td>
                  
                    <button
                      type="button"
                      className="small"
                      // onClick={() => deleteHandler(contact)}
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
