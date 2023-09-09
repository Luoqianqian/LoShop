import { useEffect, useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../slices/CartSlice";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };
  return (
    <div className=" flex flex-col items-center">
      <CheckoutSteps step1 step2 step3 />
      <div className=" mt-4">
        <h2 className=" mb-4">Payment Method</h2>
        <Form onSubmit={submitHandle}>
          <Form.Group>
            <Form.Label className=" text-lg font-medium">Select Method</Form.Label>
            <Col>
              <Form.Check
                className='my-2'
                type='radio'
                label='PayPal or Credit Card'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>
          <Button variant="secondary" type="sibmit" >Continue</Button>
        </Form>
      </div>
    </div>
  )
};

export default PaymentScreen;
