import { useState } from 'react';
import { Link, useNavigate, useParams  } from 'react-router-dom';
import { BiSolidUser, BiSolidCart } from 'react-icons/bi';
import { logout } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../slices/userSlice';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.auth.userInfo);
  const cartItemsLength = useSelector(state => state.cart.cartItems).length;
  const { keyword: urlkeyword } = useParams();
  const [keyword, setKeyword] = useState( urlkeyword || '');

  const logoutHandle = async (e) => {
    e.preventDefault();
    const res = await dispatch(logoutUser()).unwrap();
    console.log(res);
    if (res.status === 200) {
      toast.success(res.data);
      dispatch(logout());
      navigate('/login');
    } else {
      toast.error(res.data)
      return;
    }
  };

  const loginHandle = () => {
    navigate('/login');
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    if(keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword('');
    } else {
      navigate('/');
    }
  }

  return (
    <header className='container flex items-center h-20 bg-slate-800 mb-3 '>
      <nav className='flex justify-between flex-1 '>
        <div className='flex justify-center items-center ml-20 text-gray-100'>
          <Link to='/'  className='mr-28 no-underline text-gray-100'  >LOSHOP</Link>
          <input 
            type='text' 
            className='placeholder:italic placeholder:text-slate-400 mr-2 w-34 pl-3 text-xs leading-7 text-black outline-none' 
            placeholder='Seacher Products...' 
            onChange={(e) => setKeyword(e.target.value)}
            />
          <button 
            onClick={submitHandle}
            className=' text-xs px-0.5 py-1 text-green-600 border-1 border-green-600'> 
              SEARCH
          </button>
        </div>
        <div className=" flex mr-20">
          <div className=' flex items-center hover:text-gray-300 '>
            <BiSolidCart className=' text-lg' />
            <Link 
              to='/cart' 
              className=' mx-0.5 text-xs no-underline text-gray-400 hover:text-gray-300'
            >
              Cart
            </Link>
            <span className=' text-center w-4 h-4 rounded-full text-xs text-white bg-green-700'>
              {cartItemsLength}
            </span>
          </div>
          <div className=' flex items-center ml-4 hover:text-gray-300'> 
            <BiSolidUser />
            {userInfo
              ? <span onClick={logoutHandle} className=' text-xs cursor-pointer ml-0.5'>Logout</span>
              : <span onClick={loginHandle} className=' text-xs cursor-pointer ml-0.5'>Login</span>
            }
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar;
