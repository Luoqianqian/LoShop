import Order from '../models/orderModel.js';
import { capturePaypal, createPaypal } from '../paypal.js';

// 创建订单
export const addOrderItem = async (req, res) => {
  const { cartItems, 
    shippingAddress, 
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice } = req.body;
  const order = new Order({
    orderItems: cartItems.map(x => (
      {
        name: x.name,
        image: x.image,
        qty: x.qty,
        price: x.price,
        product: x._id,
      }
    )),
    shippingAddress: {...shippingAddress, postalCode: shippingAddress.postalcode}, 
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    user: req.user._id,
  });
  const createOrder = await order.save();
  res.status(201).json(createOrder);
};
// 获取订单详情
export const getOrderDetails = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findById(orderId).populate('user', 'name email');
  if(order) {
    res.status(201).json(order);
  } else {
    res.status(401).json('Order not found');
  }
};

// 创建订单支付
export const createPaypalOrder = async (req, res) => {
  const {totalPrice} = req.body;
  const result = await createPaypal(totalPrice);
  console.log(result);
  res.json(result);
};

// 确认支付
export const capturePaypalPayment = async (req, res) => {
  const {id} = req.params;
  const result = await capturePayment(id);
  console.log(result);
  res.josn(result);
};

// 订单支付后
export const updataOrderToPaid = (req, res) => {
  const { id: orderId} = req.params;
  const details = req.body;
  console.log(details);
  const order = Order.findById(orderId);
  console.log(order);
};