/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <div className=''>
      <Link to={`/product/${product._id}`} >
        <img src={product.image} alt={product.name} />
      </Link>
      <Link className='  decoration-black' to={`/product/${product._id}`} >
        <h3 className=' text-sm text-black truncate'>{product.name}</h3>
      </Link>
      <Rating value={product.rating} text={`${product.numReviews} reviews`} />
      <p className=' text-base font-medium'> ${ product.price } </p>
    </div>
  )
}

export default Product;
