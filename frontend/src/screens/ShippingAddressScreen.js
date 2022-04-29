import { Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
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

      <div>
        <label />
        <button className="signin primary" type="submit">
          Continue
        </button>
      </div>
    </form>

    {/* <React.Fragment>
    <form className="form" onSubmit={submitHandler}>

      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={14} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
      </form>

    </React.Fragment> */}
  </div>
  );
}