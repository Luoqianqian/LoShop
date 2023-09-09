import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../slices/userSlice';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) toast.error('please enter your name');
    if (!email) toast.error('please enter your email');
    if (!password) toast.error('please enter your password');
    if (!confirmPassword) toast.error('please enter your confirmPassword');

    if (name && email && password && confirmPassword) {
      if (password == confirmPassword) { 
        const inputs = {name, email, password};
        dispatch(register(inputs))
          .unwrap()
          .then((res) => {
          if (res.status === 400 || res.status === 401) {
            toast(res.data);
            return;
          }  
          if (res.status === 201) {
            toast.success(res.data);
            navigate('/login');
          }
          })
          .catch((err) => {
            toast.error(err);
          })
        } else {
          toast.error('Password do not match');
        }
    }
  };

  return (
    <div className="w-1/2 xl:w-1/4 lg:w-1/3 mx-auto min-h-screen flex items-center">
      <form className=" container flex-col space-y-5 ">
        <h1 className="text-5xl font-semibold text-mdGray pb-2">Sign up</h1>
        <div>
          <label htmlFor='name' className=" text-fontGray">name</label>
          <br />
          <input 
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter name" 
            className=" border rounded-md px-2.5 py-0.5 mt-2 w-full h-12 focus:outline focus:outline-4 focus:outline-fontGray "  />
        </div>
        <div>
          <label htmlFor='email' className=" text-fontGray">Email Address</label>
          <br />
          <input 
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter email" 
            className=" border rounded-md px-2.5 py-0.5 mt-2 w-full h-12 focus:outline focus:outline-4 focus:outline-fontGray "  />
        </div>
        <div>
          <label htmlFor='password' className=" text-fontGray">password</label>
          <br />
          <input 
            onChange={(e) => setPassword(e.target.value)} 
            value={password}
            id="password" 
            placeholder="Enter password" 
            className=" border rounded-md px-2.5 py-0.5 mt-2 w-full h-12 focus:outline focus:outline-4 focus:outline-fontGray " />
        </div>
        <div>
          <label htmlFor='confirmPassword' className=" text-fontGray">confirmPassword</label>
          <br />
          <input 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            id="confirmPassword" 
            value={confirmPassword}
            placeholder="Enter confirmPassword" 
            className=" border rounded-md px-2.5 py-0.5 mt-2 w-full h-12 focus:outline focus:outline-4 focus:outline-fontGray " />
        </div>
        <div>
          <button onClick={handleSubmit} className=" bg-btnGray rounded-md px-5 py-3 text-white hover:bg-btnGrayHover">Sign up</button>
        </div>
        <p className=" text-fontGray">
          Have a count? 
          <Link to={'/login'} className=" ml-2.5 text-gray-800 underline cursor-pointer">login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterScreen;
