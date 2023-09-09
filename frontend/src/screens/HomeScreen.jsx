import { Link, useParams } from 'react-router-dom';
import Product from '../components/Product';
import ProductCarousel from '../components/ProductCarousel';
import { getProducts } from '../slices/productsSlice';
// import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Paginate from '../components/Paginate.JSX';
import { useEffect } from 'react';

const HomeScreen =  () => {
  const { keyword, pageNumber } = useParams();
  const dispatch = useDispatch();
  const productsList = useSelector(state => state.products.productsList);
  const { products, page, pages } = productsList;

  useEffect(() => {
    dispatch(getProducts({keyword, pageNumber}))
  },[dispatch,keyword, pageNumber]);
  return (
    <>
      <div className=' mt-10 w-full'>
        { !keyword? (
          <ProductCarousel />
        ) : (
          <Link to='/' className=' no-underline bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 font-medium text-sm '>GO Back</Link>
        ) }
      </div>
      <div>
        <h1 className=' my-5'>Latest Products</h1>
        <div className=' grid grid-cols-4 gap-2 lg:grid-cols-6 pb-4 ' >
          {products?.map((product) => (
              <Product product={product} key={product._id} />
          ))}
        </div>
      </div>
      <Paginate page={page} pages={pages} keyword={keyword} />
    </>
  )
}

export default HomeScreen;
