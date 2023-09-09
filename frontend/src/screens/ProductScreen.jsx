import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image, ListGroup, Form, Button, Modal } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, createReviews } from '../slices/productsSlice';
import { addToCart } from '../slices/CartSlice';
import Rating from '../components/Rating';
import { toast } from 'react-toastify';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState();
  const [comment, setComment] = useState();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const inputRef = useRef(null);

  const product = useSelector(state => state.products.productDetails);
  const { userInfo } = useSelector(state => state.auth);

  const addToCartHandle = () => {
    dispatch(addToCart({...product, qty}));
    navigate('/cart');
  };

  const handleConfirm =() => {
    if (inputRef.current.value > product.countInStock) {
      toast.error('超出库存上限');
      setShow(false);
    }
    setQty(Number(inputRef.current.value));
    setShow(false);
  };

  const createReviewsHandle = () => {
    dispatch(createReviews({productId, rating, comment})).unwrap().then(res => {
      if (res.status === 201) {
        toast.success(res.data.message);
        setComment('');
      } else if (res.status === 400) {
        toast.error(res.data.message);
      }
    });
  };
  useEffect(() => {
    dispatch(getProductDetails(productId)).unwrap();
  }, [dispatch, productId]);

  return (
    <>
      <div className=' my-5' >
        <Link to='/' className=' no-underline bg-gray-100 text-gray-800 p-2 ' > Go Back</Link>
      </div>
      <Container>
        <Row className=''>
          <Col>
            <Image src={product.image} rounded />
          </Col>
          <Col>
            <ListGroup variant="flush">
              <ListGroup.Item className=' text-slate-900 text-2xl'  > { product.name } </ListGroup.Item>
              <ListGroup.Item><Rating value={product.rating} text={`${product.numReviews} reviews`} /></ListGroup.Item>
              <ListGroup.Item>Price: ${product.price} </ListGroup.Item>
              <ListGroup.Item>{ product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>price: </Col>
                  <Col>${qty * product.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && 
                <ListGroup.Item>
                  <Row>
                    <Col>
                    Qty:
                    </Col>  
                    <Col>
                      <div className=" grid grid-cols-3 border rounded  ">
                        <button disabled={qty === 1} onClick={() => setQty(qty - 1)}>-</button>
                        <span 
                          onClick={() => setShow(true)}
                          className=" text-center text-black " 
                        >
                          {qty}
                        </span>
                        <button disabled={qty === product.countInStock} onClick={() => setQty(qty + 1)}>+</button>
                      </div>
                    </Col>
                  </Row>
                </ListGroup.Item>
                }
                <ListGroup.Item>
                  <Button
                    variant="secondary"
                    disabled={product.countInStock === 0} 
                    className=' border-t-slate-600' 
                    onClick={addToCartHandle} >Add to Cart</Button>
                </ListGroup.Item>
              </ListGroup>
          </Col>
        </Row>
        <Row className=' mt-3'>
          <Col md='6' >
            <h3 className=' bg-gray-200 text-gray-500 text-sm p-2 font-semibold'>Reviews</h3>
            {product.numReviews === 0 && <div>No Reviews</div>}
            {product.reviews && (
              <ListGroup variant="flush">
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong className=' block mb-1'>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p className=' mt-2 text-xs'>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h3 className=' bg-gray-200 text-gray-500 text-sm p-2 mb-3 font-semibold'>Write a Customer Review</h3>
                    {userInfo && (
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label>Rating</Form.Label>
                          <Form.Select value={rating} size='sm' onChange={(e) => (setRating(e.target.value))} >
                            <option>Give a rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>comment</Form.Label>
                          <Form.Control 
                            as="textarea" 
                            placeholder="How you feel?"
                            onChange = {(e) => (setComment(e.target.value))}
                          />
                        </Form.Group>
                        <Button variant="secondary" onClick={createReviewsHandle} >submit</Button>
                      </Form>
                    )}
                  </ListGroup.Item>
                </ListGroup>
            )}
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={() => setShow(false)} size='sm' >
        <p className=' m-auto mt-3'>Modified purchase quantity</p>
        <Modal.Body className=' flex justify-center'>
            <input 
              className=" text-center text-black" 
              defaultValue={qty}
              ref={inputRef}
              onInput={(e) =>e.target.value = e.target.value.replace(/^(0+)|[^\d]+/g, '')}
            />
        </Modal.Body>
        <Modal.Footer className=' m-auto'>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancle
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
           Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export default ProductScreen;
