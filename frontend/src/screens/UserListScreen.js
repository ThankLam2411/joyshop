import  Axios  from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const UserListScreen =()=>{
    const navigate = useNavigate();
    const [users, setUsers]= useState([]);
    const dispatch = useDispatch();
    const userDelete = useSelector((state) => state.userDelete);
    const {
      loading: loadingDelete,
      error: errorDelete,
      success: successDelete,
    } = userDelete;
    useEffect(()=>{
        async function getUsers(){
            let res = await Axios.get('/api/users/');
            let users = res.data;
            setUsers(users);
            return users;

        };
        getUsers();
    },[]);
    const deleteHandler=(user)=>{
      if (window.confirm('Are you sure?')) {
        dispatch(deleteUser(user.id));
      }
    }

    return(
        <>
        {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">User Deleted Successfully</MessageBox>
      )}
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>IS SELLER</th>
              <th>IS ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.user_name}</td>
                <td>{user.user_email}</td>
                <td>{user.isUser ? 'YES' : ' NO'}</td>
                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => navigate(`/user/${user.id}/edit`)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </>
    )
}
export default UserListScreen;