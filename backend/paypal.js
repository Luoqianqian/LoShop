const {PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY} = process.env;

import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: process.env.PAYPAL_API,

})

export const getPaypalAccessToken = async () => {
  const res = await axiosInstance.request({
    method: 'post',
    url: 'v1/oauth2/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: PAYPAL_CLIENT_ID,
      password: PAYPAL_SECRET_KEY,
    },
  });
  console.log(res);
  return res.data.access_token;
};

export const createPaypal = async (totalPrice) => {
  const res = await axiosInstance.post('v2/checkout/orders',
    {
      "intent": "CAPTURE",
      "purchase_units": [
        {
          "amount": {
            "currency_code": totalPrice,
          }
        }
      ]},
      {headers:{'Content-Type': 'application/json', Authorization: `Bearer ${getPaypalAccessToken()}`}},
  )
  console.log(res);
  return res.data;
};
export const capturePaypal = async (id) => {
  const accessToken = await getPaypalAccessToken();
  const result = await axios.post(`v2/checkout/orders/${id}/capture`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(result);
  return result.data;
}
