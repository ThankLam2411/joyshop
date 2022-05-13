import  Axios  from 'axios';
import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createContact } from '../actions/contactAction.js';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { CONTACT_CREATE_RESET } from '../constants/contactConstant';
import {toast, ToastContainer} from 'react-toastify';

const ContactScreen=()=>{
  const dispatch = useDispatch();
  const [name,setName]= useState('');
  const [email,setEmail]= useState('');
  const [subject,setSubject]= useState('');
  const [message, setMessage]= useState(''); 
  // const [sent, setSent]= useState(false);
  const [loading, setLoading]= useState(false);
  const contactCreate = useSelector((state) => state.contactCreate);
  const {loading:loadingCreate, error, success, contact}= contactCreate;
  useEffect(() => {
    if(success){
       toast.success('Send message successfully')
      dispatch({type: CONTACT_CREATE_RESET})
      setName('');
      setEmail('');;
      setSubject('');
      setMessage('')
    }
  },[dispatch,success])
  const submitHandler = async(e) => {
    e.preventDefault();
    // if (!email || !subject || !message){
    //   return toast.error('Please fill name, email, subject, and message')
    // }
    // try {
    //   setLoading(true);

    //   const {data} = await Axios.post('/send_mail',{
    //     message, email, name, subject
    //   });
    //   setLoading(false);
    //   toast.success(data.message)
    // }catch(err){
    //   setLoading(false);
    //   toast.error(
    //     err.response && err.response.data.message
    //       ? err.response.data.message
    //       : err.message
    //   );
    // }
  
   dispatch(createContact({name, email,subject, message}))

}
  console.log(name, email,subject, message)

  
    return(
      <>
      {loadingCreate && <LoadingBox></LoadingBox>}
      {error && (<MessageBox variant="danger">{error}</MessageBox>)} 
      {success && (<MessageBox variant="success">Send message successfully</MessageBox>)} 

<section id="contact">

  <h1 className="section-header">Liên hệ</h1>
  {/* {!sent?( */}
  <div className="contact-wrapper">
  {/* Left contact page */} 
    <form id="contact-form" className="form-horizontal" onSubmit={submitHandler} >
      <div className="form-group">
        <div className="col-sm-12">
          <input 
            type="text" 
            className="form-control" 
            id="name" 
            placeholder="Vui lòng điền họ tên của bạn" 
            name="name"  
            value={name}
            onChange={(e) =>setName(e.target.value)}
            required />
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-12">
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            placeholder="Vui lòng điền email của bạn" 
            name="email"  
            value={email}
            onChange={(e) =>setEmail(e.target.value)}
            required />
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-12">
          <input 
            type="subject" 
            className="form-control" 
            id="subject" 
            placeholder="Chủ đề" 
            name="subject"  
            value={subject}
            onChange={(e) =>setSubject(e.target.value)}
            required />
        </div>
      </div>
      <textarea 
        className="form-control" 
        placeholder="Nội dung" 
        name="message" 
        value={message}
        onChange={(e) =>setMessage(e.target.value)}
        required 
          />
      <button className="btn btn-primary send-button" id="submit" type="submit" value="SEND">
        <div className="alt-send-button">
          <i className="fa fa-paper-plane" /><span className="send-text">SEND</span>
        </div>
      </button>
    </form>
  {/* Left contact page */} 
    <div className="direct-contact-container">
      <ul className="contact-list">
        <li className="list-item"><i className="fa fa-map-marker fa-2x"><span className="contact-text place">Ha Noi, VietNam</span></i></li>
        <li className="list-item"><i className="fa fa-phone fa-2x"><span className="contact-text phone"><a href="tel:1-212-555-5555" title="Give me a call">(+84)866 843 733</a></span></i></li>
        <li className="list-item"><i className="fa fa-envelope fa-2x"><span className="contact-text gmail"><a href="mailto:thanhlam241120@gmail.com" title="Send me an email">lam@gmail.com</a></span></i></li>
      </ul>
      <hr />
    </div>
  </div>
  {/* ):(
    <h1>Email Sent</h1>
  )} */}
 
</section>

    </>

    )
}
export default ContactScreen;