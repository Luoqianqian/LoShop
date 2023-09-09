import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps.jsx';
import { Container,Row, Col, ListGroup, Image, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { createOrder } from '../slices/orderSlice.js';
import { clearItems } from '../slices/CartSlice.jsx';
import { toast } from 'react-toastify';

const PlaceOrderScreen = () => {
  const cart = useSelector(state => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, 
          shippingAddress, 
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        } = cart;
  const {address, city, country, postalcode} = shippingAddress;

  const submitHandle = async () => {
    try {
      const res = await dispatch(createOrder({
        cartItems, 
        shippingAddress, 
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
      } )).unwrap();
      const {data} = res;
      if(res.status === 201) {
        dispatch(clearItems())
        navigate(`/order/${data._id}`);
      } else {
        toast.error(res.data);
      }
    } catch(err) {
      console.log(err);
      toast.error(err);
    }
  };

  useEffect(() => {
    if(!shippingAddress) {
      navigate('/shipping');
    } else if(!paymentMethod) {
      navigate('/payment');
    }
  }, [navigate, shippingAddress, paymentMethod])


  return (
    <div className=" flex flex-col items-center">
      <CheckoutSteps step1 step2 step3 step4 />
      <Container className=' mt-4 '>
        <Row>
          <Col xs={8}>
            <ListGroup>
              <ListGroup.Item>
                <h1 className=' text-gray-500'>Shoping</h1>
                <p><strong>Address:</strong>  {address}{city}{country}{postalcode}</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h1 className=' text-gray-500'>paymentMethod</h1>
                <p><strong>Method:</strong>  {paymentMethod}</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h1 className=' text-gray-500'>Order Items</h1>
                <ListGroup variant='flush'>
                  {cartItems.map(item => (
                    <ListGroup.Item key={item._id}>
                      <Row>
                        <Col><Image sizes='xs' src={item.image} /></Col>
                        <Col xs={6}><Link to={`/product/:${item._id}`} className=' text-gray-700'>{item.name}</Link></Col>
                        <Col xs={5} className=' text-gray-500'>{`${item.qty} x $${item.price} =`}${item.qty*item.price}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            <ListGroup>
              <ListGroup.Item>
                <h1 className=' text-gray-500'>Order Summary</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col >Items</Col>
                  <Col>{itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>{shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>{taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>{totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button variant='secondary' onClick={submitHandle} >Place Order</Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  )
};

export default PlaceOrderScreen;
