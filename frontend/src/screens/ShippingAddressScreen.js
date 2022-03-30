import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../actions/shippingActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingAddressScreen(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo}= userSignin;
    const ship = useSelector(state => state.shippingAddress);
    const {shippingAddress} = ship;

    const [fullName, setFullName] = useState(shippingAddress.fullName||'');
    const [address, setAddress] = useState(shippingAddress.address||'');
    const [phone, setPhone] = useState(shippingAddress.phone||'');
    const [city, setCity] = useState(shippingAddress.city||'');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode||'');
    const [country, setCountry] = useState(shippingAddress.country||'');
    if(!userInfo){
        navigate('/signin');
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, phone, address, city, postalCode, country}))
        navigate('/payment')
    }
    return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
    <form className="form" onSubmit={submitHandler}>
      <div>
        <h1>Shipping Address</h1>
      </div>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input
          className="signin"
          type="text"
          id="fullName"
          placeholder="Enter full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        ></input>
      </div>
      <div>
        <label htmlFor="phone">Phone</label>
        <input
          className="signin"
          type="text"
          id="phone"
          placeholder="Enter phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        ></input>
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <input
          className="signin"
          type="text"
          id="address"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        ></input>
      </div>
      <div>
        <label htmlFor="city">City</label>
        <input
          className="signin"
          type="text"
          id="city"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        ></input>
      </div>
      <div>
        <label htmlFor="postalCode">Postal Code</label>
        <input
          className="signin"
          type="text"
          id="postalCode"
          placeholder="Enter postal code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        ></input>
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <input
          className="signin"
          type="text"
          id="country"
          placeholder="Enter country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        ></input>
      </div>
      {/* <div>
        <label htmlFor="chooseOnMap">Location</label>
        <button type="button" onClick={chooseOnMap}>
          Choose On Map
        </button>
      </div> */}
      <div>
        <label />
        <button className="signin primary" type="submit">
          Continue
        </button>
      </div>
    </form>
  </div>
  );
}