import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { detailsUser, updateUserProfile } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import Axios from "axios";

const ProfileScreen=()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate()
    // const {id: userId} = useParams();
    const [user_name, setUserName] = useState('');
    const [user_email, setUserEmail] = useState('');
    const [user_phone, setUserPhone] = useState('');
    const [user_address, setUserAddress] = useState('');
    const [user_image, setUserImage] = useState('');
    const [user_password, setUserPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo}= userSignin;
    const userDetails = useSelector((state) => state.userDetails);
    const {loading, error, user} = userDetails;
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const {success: successUpdate,error:errorUpdate, loading: loadingUpdate} = userUpdateProfile;
    console.log(userDetails)
    // const [user_name, setUserName] = useState(user.user_name);
    // const [user_email, setUserEmail] = useState(user.user_email);
    // const [user_phone, setUserPhone] = useState(user.user_phone);
    // const [user_address, setUserAddress] = useState(user.user_address);
    // const [user_password, setUserPassword] = useState('')
    // const [confirmPassword, setConfirmPassword] = useState('')
    useEffect(()=>{
  console.log('adddadastftfgfgfg ',successUpdate);
        if(!user){
            dispatch(detailsUser(userInfo.id))
        }else{
            setUserName(user.user_name);
            setUserEmail(user.user_email);
            setUserPhone(user.user_phone);
            setUserAddress(user.user_address);
            setUserImage(user.user_image);
            // setUserPassword(user.user_password);
        }
        if(successUpdate){
            console.log(successUpdate);

            // navigate('/')
            dispatch(detailsUser(userInfo.id))

            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            

        }
    },[successUpdate,user]);
    const submitHandler = (e) => {
        e.preventDefault();
        if(user_password !== confirmPassword){
            alert('Password and confirm password are not matched')
        }else{
            // dispatch({type: USER_UPDATE_PROFILE_RESET})
            
            dispatch(updateUserProfile({userId: user.id, user_name, user_email,user_password, user_phone, user_address, user_image}))
        }
    }
            const [loadingUpload, setLoadingUpload] = useState(false);
            const [errorUpload, setErrorUpload] = useState('');
            const [uploadStatus, setUploadStatus] = useState('')

            const uploadFileHandler = async (e) => {
            const file = e.target.files[0];
            const bodyFormData = new FormData();
            bodyFormData.append('image', file);
            setLoadingUpload(true);
            try {
                const { data } = await Axios.post('/api/uploads/', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`,
                },
                });
                console.log(data)
                setUserImage(data);
                setLoadingUpload(false);
            } catch (error) {
                setErrorUpload(error.message);
                setLoadingUpload(false);
            }
        };
        console.log('123', user);
    return (
       
        <>
        <div className="row">
            {/* Account page navigation*/}
            <nav className="nav nav-borders">
                <h1 className="section-header">Profile</h1>
            </nav>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (<MessageBox variant="danger">{error}</MessageBox>)} 
            {successUpdate && (<MessageBox variant="success">Update Profile successfully</MessageBox>)} 
            {loading?<LoadingBox></LoadingBox>:
          error?<MessageBox variant="danger">{error}</MessageBox>:
          (
              <>
                <hr className="mt-0 mb-4" />
                <div className="row">
                    <div className=" c-12 l-4">
                    {/* Profile picture card*/}
                    <div className="card ">
                        <div className="card-header"><h3>Profile Picture</h3></div>
                        <div className="card-body text-center">
                        
                            {/* Profile picture image*/}
                            <img className="img-account-profile " src={user_image || "http://bootdey.com/img/Content/avatar/avatar1.png"} alt="" />
                            {/* Profile picture help block*/}
                            <div className="small font-italic text-muted mb-4">
                                {/* <label htmlFor="imageFile">Image File</label> */}
                                <input
                                    type="file"
                                    name="image"
                                    id="imageFile"
                                    label="Choose Image"
                                    onChange={uploadFileHandler}
                                ></input>
                            </div>
                            <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                            {/* Profile picture upload button*/}
                            {/* <button className="cart primary" type="button">Upload new image</button> */}
                        </div>
                    </div>
                    </div>
                    <div className="c-12 l-8">
                    {/* Account details card*/}
                    <div className="card mb-4">
                        <div className="card-header"><h3>Account Details</h3></div>
                        <div className="card-body">
                        <form type="submit" onSubmit={submitHandler}>
                            {/* Form Group (username)*/}
                            <div className="mb-3">
                        <label htmlFor="name">Name</label>
                            <input 
                                className="form-control" 
                                id="inputUsername" 
                                type="text" 
                                placeholder="Enter your username" 
                                value={user_name}
                                onChange={(e)=>setUserName(e.target.value)}
                                />
                            </div>

                            
                            {/* Form Group (email address)*/}
                            <div className="mb-3">
                            <label className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
                            <input  type="text" 
                                    id="email" 
                                    placeholder="Enter email"
                                    value={user_email}
                                    onChange={(e)=>setUserEmail(e.target.value)} />
                            </div>
                            {/* Form Row*/}
                            <div className="row gx-3 mb-3">
                            {/* Form Group (phone number)*/}
                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor="inputPhone">Phone number</label>
                                    <input  type="text" 
                                    id="phone" 
                                    placeholder="Enter phone"
                                    value={user_phone}
                                    onChange={(e)=>setUserPhone(e.target.value)} />
                                </div>
                                {/* Form Group (birthday)*/}
                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor="address">Address</label>
                                    <input  type="text" 
                                    id="address" 
                                    placeholder="Enter address"
                                    value={user_address}
                                    onChange={(e)=>setUserAddress(e.target.value)} />
                                </div>
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
                            {/* Save changes button*/}
                            <button className="block primary cart" type="submit">Save changes</button>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
            </>
          )}
            </div>

        </>
    )
}
export default ProfileScreen;