import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { register } from '../actions/userActions';

const RegisterScreen=()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName]= useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [phone,setPhone]=useState('');
    const [address,setAddress]=useState('');

    
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    console.log(redirect);


    const userRegister = useSelector((state)=>state.userRegister)
    const {userInfo, loading, error} = userRegister;
    const submitHandler=(e)=>{
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Password and confirm password are not match')
        }else{
            dispatch(register(name,email,password, phone,address))
        }
    }
    useEffect(()=>{
        if (userInfo){
            navigate(redirect);
        }
    },[navigate,redirect,userInfo])
    return(
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Register</h1>
                <div>
                    <label htmlFor="name">Name</label>
                    <input 
                        className="signin"
                        type="name" 
                        id="name" 
                        name="name" 
                        value={name}
                        placeholder="Enter name" required
                        onChange={e => setName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        className="signin"
                        type="email" 
                        id="email" 
                        name="email" 
                        value={email}
                        placeholder="Enter email" required
                        onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password">Password </label>
                    <input 
                        className="signin"
                        type="password" 
                        id="password" 
                        name="password" 
                        value={password}
                        placeholder="Enter password" required
                        onChange={e => setPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="password">Confirm Password </label>
                    <input 
                        className="signin"
                        type="password" 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        value={confirmPassword}
                        placeholder="Enter Confirm Password" required
                        onChange={e => setConfirmPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="phone">Phone </label>
                    <input 
                        className="signin"
                        type="phone" 
                        id="phone" 
                        name="phone" 
                        value={phone}
                        placeholder="Enter phone" required
                        onChange={e => setPhone(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="address">Address </label>
                    <input 
                        className="signin"
                        type="address" 
                        id="address" 
                        name="address" 
                        value={address}
                        placeholder="Enter address" required
                        onChange={e => setAddress(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label />
                    <button className="signin primary" type="submit">
                        Register
                    </button>
                </div>
                <div>
          <label />
          <div>
            Already have an account?{' '}
            <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
          </div>
        </div>
            </div>

            </form>
        </div>
    )
}
export default RegisterScreen;