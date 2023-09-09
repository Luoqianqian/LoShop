import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../slices/userSlice';
import { setCredentials } from '../slices/authSlice';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const userInfo = useSelector((state) => state.auth.userInfo)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) toast.error('please enter your email');
    if (!password) toast.error('please enter your password');
    if (email && password) {
      try {
        const inputs = {email, password};
        dispatch(login(inputs))
          .unwrap()
          .then((res) => {
            console.log(res);
            if (res.status === 201) {
              dispatch(setCredentials({...res.data}))
              navigate(redirect);
            }
            if (res.status === 400 || res.status === 401) {
              toast(res.data);
              return;
          } 
          })
          .catch((err) => {
            toast.error(err.data);
            return;
          });
      } catch (err) {
          console.log(err);
          toast.error(err?.data?.message || err.error);
          return; 
      }
    }
  }   
  return (
    <div className="w-1/2 xl:w-1/4 lg:w-1/3 mx-auto min-h-screen flex items-center">
      <form className=" container flex-col space-y-5 ">
        <h1 className="text-5xl font-semibold text-mdGray pb-2">Sign In</h1>
        <div>
          <label htmlFor='email' className=" text-fontGray">Email Address</label>
          <br />
          <input 
            id='email'
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter email" 
            className=" border rounded-md px-2.5 py-0.5 mt-2 w-full h-12 focus:outline focus:outline-4 focus:outline-fontGray "  />
        </div>
        <div>
          <label htmlFor='password' className=" text-fontGray">password</label>
          <br />
          <input 
            onChange={(e) => setPassword(e.target.value)} 
            id="password" 
            placeholder="Enter password" 
            className=" border rounded-md px-2.5 py-0.5 mt-2 w-full h-12 focus:outline focus:outline-4 focus:outline-fontGray " />
        </div>
        <div>
          <button onClick={handleSubmit} className=" bg-btnGray rounded-md px-5 py-3 text-white hover:bg-btnGrayHover">Sign In</button>
        </div>
        <p className=" text-fontGray">
          New Customer? 
          <Link to={'/register'} className=" ml-2.5 text-gray-800 underline cursor-pointer">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginScreen;
