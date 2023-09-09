import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './store.js';
import { createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import { createBrowserRouter} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import OrderScreen from './screens/OrderScreen';
import RegisterScreen from './screens/RegisterScreen.jsx';
import CartScreen from './screens/CartScreen.jsx';
import ProductScreen from './screens/ProductScreen';
import PrivateRoute from './components/PrivateRoute.jsx';
import ShippingScreen from './screens/ShippingScreen.jsx';
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx';
import PaymentScreen from './screens/PaymentScreen.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { clientId } from './constains/constants.js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<App />}>
        <Route index={true} path='/' element={<HomeScreen />} />
        <Route path='/search/:keyword' element={<HomeScreen />} />
        <Route path='/page/:pageNumber' element={<HomeScreen />} />
        <Route
          path='/search/:keyword/page/:pageNumber'
          element={<HomeScreen />}
        />
        <Route path='/product/:id' element={<ProductScreen />} />
        <Route path='/cart' element={<CartScreen />} />
        {/* Registered users */}
        <Route path='' element={<PrivateRoute />}>
          <Route path='/shipping' element={<ShippingScreen />} />
          <Route path='/payment' element={<PaymentScreen />} />
          <Route path='/placeorder' element={<PlaceOrderScreen />} />
          <Route path='/order/:id' element={<OrderScreen />} />
          {/* <Route path='/profile' element={<ProfileScreen />} /> */}
        </Route>
      </Route>
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> 
      <PayPalScriptProvider  options={{ clientId: clientId }}>
        <RouterProvider router={router} /> 
      </PayPalScriptProvider>
      <ToastContainer 
        autoClose={2000}
      />
    </Provider>
  </React.StrictMode>
);