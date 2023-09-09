import { useDispatch, useSelector } from 'react-redux';
import { Carousel, Image } from 'react-bootstrap';
import { getTopProducts } from '../slices/productsSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductCarousel = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTopProducts());
  }, [dispatch]);
  const products = useSelector((state) => state.products.productsTop);
  return (
    <>
      <Carousel pause='hover'  className=' w-full bg-slate-800 mt-3'>
        { products.map( (product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image src={product.image} fluid />
              <Carousel.Caption className=' carousel-caption bg-slate-800 bg-opacity-50 w-full' >
                <h2>
                  {product.name} (${product.price})
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
          )
        )
      }
    </Carousel> 
    </>
  )
}

export default ProductCarousel;
