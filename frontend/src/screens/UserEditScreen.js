import  Axios  from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { detailsUser, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const UserEditScreen=()=>{
    const params = useParams();
    const { id: userId } = params;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user_name, setUserName] = useState('');
    const [user_email, setUserEmail] = useState('');
    const [user_phone, setUserPhone] = useState('');
    const [user_address, setUserAddress] = useState('');
    const [isAdmin,setIsAdmin] = useState(false);
    const [isUser,setIsUser] = useState(false);
    const userDetails = useSelector((state) => state.userDetails);
    const {loading, error, user} = userDetails;
    const userUpdate = useSelector((state) => state.userUpdate);
    const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
    } = userUpdate;
    useEffect(()=>{
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            navigate('/userlist');
          }
        if(!user){
            dispatch(detailsUser(userId))
        }else{
            setUserName(user.user_name);
            setUserEmail(user.user_email);
            setUserPhone(user.user_phone);
            setUserAddress(user.user_address);
            setIsUser(user.isUser);
            setIsAdmin(user.isAdmin);
        }
    },[dispatch,userId, user, successUpdate, navigate])
    // useEffect(()=>{
    //     async function getUser(){
    //         let res = await Axios.get(`/api/users/${userId}`);
    //         let users = res.data;
    //         setUser(user);
    //         return user;

    //     };
    //     getUser();
    // },[]);
    console.log(user)
    console.log(isAdmin)

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ id: userId, user_name, user_email, user_phone, user_address,isUser,isAdmin }));

    }
        
    return(
        <div>
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h1> Sửa tài khoản {user_name}</h1>
          </div>
            <>
              <div>
                <label htmlFor="name">Họ tên</label>
                    <input 
                        type="text" 
                        id="name" 
                        placeholder="Enter name"
                        value={user_name}
                        onChange={(e)=>setUserName(e.target.value)}
                    ></input>
            </div>

            <div>
                <label htmlFor="email">Email</label>
                    <input 
                        type="text" 
                        id="email" 
                        placeholder="Enter email"
                        value={user_email}
                        onChange={(e)=>setUserEmail(e.target.value)}

                    ></input>
            </div>

            <div>
                <label htmlFor="phone">Phone</label>
                    <input 
                        type="text" 
                        id="phone" 
                        placeholder="Enter phone"
                        value={user_phone}
                        onChange={(e)=>setUserPhone(e.target.value)}
                    ></input>
            </div>
            <div>
                <label htmlFor="address">Địa chỉ</label>
                    <input 
                        type="text" 
                        id="address" 
                        placeholder="Enter address"
                        value={user_address}
                        onChange={(e)=>setUserAddress(e.target.value)}
                    ></input>
            </div>
                      
                     

              <div>
                <label htmlFor="isSeller"> User</label>
                <input
                  id="isSeller"
                  type="checkbox"
                  checked={isUser}
                  onChange={(e) => setIsUser(e.target.checked)}
                ></input>
              </div>
              <div>
                <label htmlFor="isAdmin"> Admin</label>
                <input
                  id="isAdmin"
                  type="checkbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                ></input>
              </div>
              <div>
                <button type="submit" className="primary">
                  Update
                </button>
              </div>
            </>
        </form>
      </div>
    )
}
export default UserEditScreen;