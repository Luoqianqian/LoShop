import { useParams } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { getOrderDetails } from "../slices/orderSlice.js";
import { useEffect } from "react";
import { Container, Row, Col, ListGroup, Image} from "react-bootstrap";
import Message from "../components/Message.jsx";
import Loading from "../components/Loading.jsx";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from 'react-toastify';
import axios from '../config/axios.js';

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const dispatch = useDispatch();
  const {data, loading: isLoading } = useSelector(state => state.order.orderDetails)
  useEffect(() => {
    dispatch(getOrderDetails(orderId)).unwrap()
  },[dispatch,orderId])

const createOrder = async () => {
  // 返回值为订单ID
  const res = await axios.post(`/api/order/${orderId}/createPaypalOrder`, data.totalPrice);
  console.log(res);
  return res.data.id;
 }

 const onApprove = async (orderID) => {
  // 成功确认订单
  const res = await axios.get(`/api/order/:${orderID}/capture`);
  console.log(res);
  return res.data;
 };

function onError(err) {
  toast.error(err?.data);
}

  return (
    <>
      {isLoading
      ? (<Loading />)
      :(<Container>
        <Row>
          <Col xs={8}>
            <h2 className=' text-gray-400 my-4'>Order{orderId}</h2>
            <ListGroup>
              <ListGroup.Item>
                <h3 className=' text-gray-400'>Shipping</h3>
                <p><strong>Name:</strong>  {data.user?.name}</p>
                <p><strong>User:</strong>  {data.user?.email}</p>
                <p><strong>Address:</strong>  {data.shippingAddress?.address}, {data.shippingAddress?.city}, {data.shippingAddress?.postalCode}, {data.shippingAddress.country}</p>
                {data.isDelivered 
                  ? <div>Delivered</div>
                  : <Message variant='danger'> No Delivered</Message>
                }
              </ListGroup.Item>
              <ListGroup.Item>
                <h3 className=' text-gray-400'>Payment Method</h3>
                <p><strong>Payment Method:</strong>  {data.paymentMethod}</p>  
                {data.isPayed
                  ? <div> Already Paie</div>
                  : <Message variant='danger'> No paid</Message>
                }           
              </ListGroup.Item>
              <ListGroup.Item>
                <h3 className=' text-gray-400'>Order Items</h3>
                 <ListGroup>
                  {data.orderItems.map(item => (
                    <ListGroup.Item key={item._id}>
                      <Row>
                        <Col xs={1}>
                          <Image src={item.image} />
                        </Col>
                        <Col>
                          {item.name}
                        </Col>
                        <Col>
                          <span className=' text-gray-400'>{item.qty} * {item.price} = ${item.qty*item.price}</span>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            <ListGroup>
               <ListGroup.Item className=" p-3">
                 <h1 className=' text-gray-500'>Order Summary</h1>
               </ListGroup.Item>
               <ListGroup.Item>
                 <Row  className="p-2">
                   <Col >Items</Col>
                   <Col>${data.itemsPrice}</Col>
                 </Row>
               </ListGroup.Item>
               <ListGroup.Item>
                 <Row className="p-2">
                   <Col>Shipping</Col>
                   <Col>${data.shippingPrice}</Col>
                 </Row>
               </ListGroup.Item>
               <ListGroup.Item>
                 <Row className="p-2">
                   <Col>Tax</Col>
                   <Col>${data.taxPrice}</Col>
                 </Row>
               </ListGroup.Item>
               <ListGroup.Item>
                 <Row className="p-2">
                   <Col>Total</Col>
                   <Col>${data.totalPrice}</Col>
                 </Row>
               </ListGroup.Item>
               <ListGroup.Item>
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                     />
               </ListGroup.Item>
             </ListGroup>            
           </Col>
        </Row>
      </Container>)    
      }
   </>
   )
};

export default OrderScreen;
