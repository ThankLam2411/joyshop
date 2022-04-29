import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {deleteContact, listContact} from '../actions/contactAction'
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { CONTACT_DELETE_RESET } from "../constants/contactConstant";


const ListContactScreen=()=> {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();


  const contactList = useSelector((state) => state.contactList);
  const {loading, error, contacts, totalPages, page}= contactList;
  const pageNumber = location.search.split('?page=')[1];
  const pages =[...Array(totalPages).keys()]


  console.log(contacts)
//   const productCreate = useSelector((state) => state.productCreate);
//   const {
//     loading: loadingCreate,
//     error: errorCreate,
//     success: successCreate,
//     product: createdProduct,
//   } = productCreate;

  const contactDelete = useSelector((state) => state.contactDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = contactDelete;
//   const userSignin = useSelector((state) => state.userSignin);
//   const { userInfo } = userSignin;
  useEffect(() => {
    // if (successCreate) {
    //   dispatch({ type: PRODUCT_CREATE_RESET });
    //   navigate(`/productlist`);
    // }
    if (successDelete) {
      dispatch({ type: CONTACT_DELETE_RESET });
    }
    dispatch(listContact(pageNumber))
  }, [
    dispatch,
    navigate,
    pageNumber,
    successDelete
  ]);

  const deleteHandler = (contact) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteContact(contact.id));
    }
  };
//   const createHandler = () => {
//     navigate(`/product/create`)
//   };
  return (
    <div>
      <div className="container">
        <h1>List Contacts </h1>
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {/* {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>} */}
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
                <th>EMAIL</th>
                <th>SUBJECT</th>
                <th>MESSAGE</th>
                <th>CREATEDAT</th>
                <th>UPDATEDAT</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {contacts.contacts.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.id}</td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.subject}</td>
                  <td>{contact.message}</td>
                  <td>{contact.createdAt}</td>
                  <td>{contact.updatedAt}</td>

                  <td>
                  
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(contact)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <div className="box">
                  <ul className="pagination">
                  <li><Link to={`/productlist?page=${page-1}`}><i className="bx bxs-chevron-left" /></Link></li>

                {
                  pages.map((x)=>(
                    
                      <li ><Link
                            className={x + 1 === page ? 'active' : ''}
                            key={x + 1}
                            to={`/comments?page=${x+1}`}
                          >
                            {x+1}
                        </Link>
                      </li>

                    

                  ))
                }
                  <li><Link to={`/comments?page=${page+1}`}><i className="bx bxs-chevron-right" /></Link></li>

                    
                  </ul>
                </div> */}
        
        </>
      )}
    </div>
  );
}
export default ListContactScreen;
