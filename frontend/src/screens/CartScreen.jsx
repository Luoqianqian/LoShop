import { useSelector, useDispatch } from "react-redux";
import { Row, Col, ListGroup, Button, Image, Modal } from 'react-bootstrap';
import {AiOutlineDelete} from 'react-icons/ai';
import { addToCart, removeFromCart } from "../slices/CartSlice";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const CartScreen = () => {
  const {cartItems} = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const inputRef = useRef(null);

  const handleConfirm =(item) => {
  if (inputRef.current.value > item.countInStock) {
    toast.error('超出库存上限');
    setShow(false);
  }
    dispatch(addToCart({...item, qty: inputRef.current.value}))
    setShow(false);
    inputRef.current.blur();
  };

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  }

  const checkoutHandle = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div>
      <Row>
        <Col md='8'>
          <h1>Shopping Cart</h1>
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id} >
                <Row>
                  <Col md='2'>
                    <Image src={item.image} fluid rounded />
                  </Col>
                  <Col md='3' className=" text-sm underline">{item.name}</Col>
                  <Col md='2' className=" text-sm">${item.price * item.qty}</Col>
                  <Col md='3'>
                    <div className=" grid grid-cols-3 border rounded  ">
                      <button disabled={item.qty === 1} onClick={() => dispatch(addToCart({...item, qty: item.qty-1}))}>-</button>
                      <input 
                        onClick={() => setShow(true)}
                        className=" text-center text-black outline-none" 
                        value={item.qty} 
                      />
                      <button disabled={item.qty === item.countInStock} onClick={() => dispatch(addToCart({...item, qty: item.qty+1}))}>+</button>
                    </div>
                  </Col>
                  <Col>
                    <Button variant="btn-bg">
                      <AiOutlineDelete onClick={() => removeItem(item._id)} />
                    </Button>
                  </Col>
                </Row>
                <Modal show={show} onHide={() => setShow(false)} size='sm' >
                  <p className=' m-auto mt-3'>Modified purchase quantity</p>
                  <Modal.Body className=' flex justify-center'>
                      <input 
                        className=" text-center text-black" 
                        defaultValue={item.qty}
                        ref={inputRef}
                        onInput={(e) =>e.target.value = e.target.value.replace(/^(0+)|[^\d]+/g, '')}
                      />
                  </Modal.Body>
                  <Modal.Footer className=' m-auto'>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                      Cancle
                    </Button>
                    <Button variant="primary" onClick={() => (handleConfirm(item))}>
                     Confirm
                    </Button>
                  </Modal.Footer>
                </Modal>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md='4'>
          <ListGroup className=" w-full">
            <ListGroup.Item>
              <h1 className=" md:text-2xl">
                Subtotal({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
              </h1>
              <p>$ {cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button 
                variant="secondary" 
                onClick={checkoutHandle} 
                disabled={cartItems.length === 0} >
                  Proceed To Checkout 
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  )
}

export default CartScreen;
