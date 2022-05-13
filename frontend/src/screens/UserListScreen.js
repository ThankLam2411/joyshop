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
      if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
        dispatch(deleteUser(user.id));
      }
    }

    return(
        <>
        <h1>Quản lý thành viên</h1>
        {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">Xóa thành viên thành công</MessageBox>
      )}
        <table className="table">
          <thead>
            <tr>
              <th>Mã thành viên</th>
              <th>Tên tài khoản</th>
              <th>Địa chỉ email</th>
              <th>User</th>
              <th>ADMIN</th>
              <th>Thao tác</th>
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
                    Sửa
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(user)}
                  >
                    Xóa
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