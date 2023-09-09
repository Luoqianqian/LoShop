import axios from "axios";
import { BASE_URL } from "../constains/constants";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Credentials': true,
  },
  withCredentials: true,
});

export default instance;