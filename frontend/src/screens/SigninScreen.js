import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import GoogleLogin from 'react-google-login';
import { refreshTokenSetup } from '../utils/refreshToken';

const SigninScreen=()=>{
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [loginData, setLoginData] = useState(
        localStorage.getItem('loginData')
        ?JSON.parse(localStorage.getItem('loginData'))
        :null
    );
  
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
  
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;
  
    const dispatch = useDispatch();
    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(signin(email, password));
    };
    useEffect(() => {
      if (userInfo) {
        navigate(redirect);
      }
    }, [navigate, redirect, userInfo]);
    const handleFailure=(res)=>{
        // console.log('Login Success: current user', res.profileObj);

        // refreshTokenSetup(res);
        alert(res)
    }
    const handleLogin =async(googleData) => {
        const res = await fetch('/api/users/google-login',{
            method:'POST',
            body: JSON.stringify({
                token: googleData.tokenId,
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        setLoginData(data);
        localStorage.setItem('loginData', JSON.stringify(data))
        console.log(googleData)
        console.log(JSON.stringify(googleData.tokenId))
    }
    const handleLogout=()=>{
        localStorage.removeItem('loginData')
        setLoginData(null)
    }
    return(
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                <div>
                {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
                    <label htmlFor="email">Email address</label>
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
                    <label />
                    <button className="signin primary" type="submit">
                        Sign In
                    </button>
                </div>
                <div>
                    {loginData?(
                        <div>
                            <h3>You logged in as {loginData.email}</h3>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    ):(
                        <GoogleLogin 
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Log in with Google"
                        onSuccess={handleLogin}
                        onFailure={handleFailure}
                        cookiePolicy={'single_host_origin'}
                    >

                    </GoogleLogin>
                    )}
                   
                </div>
                <div>
          <label />
            <div>
                New customer?{' '}
                <Link to={`/register?redirect=${redirect}`} style={{color: '#f0c040', display: 'inline-block'}}>
                Create your account
                </Link>
            </div>
            </div>
            </div>

            </form>
        </div>
    )
}
export default SigninScreen;