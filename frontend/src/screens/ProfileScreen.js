import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { detailsUser, updateUserProfile } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

const ProfileScreen=()=>{
    const dispatch = useDispatch();
    // const {id: userId} = useParams();
    const [user_name, setUserName] = useState('');
    const [user_email, setUserEmail] = useState('');
    const [user_phone, setUserPhone] = useState('');
    const [user_address, setUserAddress] = useState('');
    const [user_password, setUserPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo}= userSignin;
    const userDetails = useSelector((state) => state.userDetails);
    const {loading, error, user} = userDetails;
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const {success: successUpdate,error:errorUpdate, loading: loadingUpdate} = userUpdateProfile;
    console.log(user)
    console.log(userInfo.id)
    // const [user_name, setUserName] = useState(user.user_name);
    // const [user_email, setUserEmail] = useState(user.user_email);
    // const [user_phone, setUserPhone] = useState(user.user_phone);
    // const [user_address, setUserAddress] = useState(user.user_address);
    // const [user_password, setUserPassword] = useState('')
    // const [confirmPassword, setConfirmPassword] = useState('')
    useEffect(()=>{
        if(!user){
            dispatch(detailsUser(userInfo.id))
        }else{
            setUserName(user.user_name);
            setUserEmail(user.user_email);
            setUserPhone(user.user_phone);
            setUserAddress(user.user_address);
            // setUserPassword(user.user_password);
        }
    },[dispatch, userInfo.id, user])
    const submitHandler = (e) => {
        e.preventDefault();
        if(user_password !== confirmPassword){
            alert('Password and confirm password are not matched')
        }else{
            dispatch({type: USER_UPDATE_PROFILE_RESET})
            dispatch(updateUserProfile({userId: user.id, user_name, user_email,user_password, user_phone, user_address}))
        }
    }
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {
                    loading ? <LoadingBox></LoadingBox>
                    : error ? <MessageBox variant="danger">{error}</MessageBox>
                    :
                    <>
                        <div>
                            {loadingUpdate && <LoadingBox></LoadingBox>}
                            {errorUpdate && (<MessageBox variant="danger">{errorUpdate}</MessageBox>)}
                            {successUpdate && (<MessageBox variant="success">Profile updated successfully</MessageBox>)}
                            <label htmlFor="name">Name</label>
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
                            <label htmlFor="address">Address</label>
                            <input 
                                type="text" 
                                id="address" 
                                placeholder="Enter address"
                                value={user_address}
                                onChange={(e)=>setUserAddress(e.target.value)}
                            ></input>
                        </div>
                      
                     

                        <div>
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                placeholder="Enter password"
                                onChange={(e)=>setUserPassword(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input 
                                type="password" 
                                id="confirmPassword" 
                                placeholder="Enter confirm password"
                                onChange={(e)=>setConfirmPassword(e.target.value)}
                            ></input>
                        </div>
                        <label/>
                        <button className="cart primary block" type="submit">Update</button>

                        
                    </>
                }
            </form>
        </div>
    )
}
export default ProfileScreen;