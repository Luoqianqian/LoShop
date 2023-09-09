import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../slices/CartSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {

  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalcode, setPostaLcode] = useState(shippingAddress.postalcode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const navitage = useNavigate();
  const dispatch = useDispatch();
  const submitHandle = (e) => {
    e.preventDefault();
    if(address && city && postalcode && country) {
      dispatch(saveShippingAddress({address, city, postalcode,country}));
      navitage('/payment');
    } else {
      toast.error('Please fill in the full address')
    }
  };
  return (
    <div className=' flex flex-col items-center'>
      <CheckoutSteps step1 step2 />
      <div className=' mt-4'>
        <h1>shipping</h1>
        <Form>
          <Form.Group className="mb-3" >
            <Form.Label>Address</Form.Label>
            <Form.Control 
              type="text" 
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)} 
              placeholder="Enter address" 
              className=' placeholder:text-gray-500'
            />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>City</Form.Label>
            <Form.Control 
              type="text" 
              required
              value={city}
              onChange={(e) => setCity(e.target.value)} 
              placeholder="Enter city"
              className=' placeholder:text-gray-500'
            />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Postal Code</Form.Label>
            <Form.Control 
              type="text"  
              required
              value={postalcode}
              onChange={(e) => setPostaLcode(e.target.value)} 
              placeholder="Enter postal code" 
              className=' placeholder:text-gray-500'
            />
          </Form.Group>
          <Form.Group className="mb-3 placeholder:text-gray-500" >
            <Form.Label>Country</Form.Label>
            <Form.Control 
              type="text" 
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)} 
              placeholder="Enter country" 
              className=' placeholder:text-gray-500'
            />
          </Form.Group>
          <Button variant="secondary" onClick={submitHandle}>
            Continue
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default ShippingScreen;
