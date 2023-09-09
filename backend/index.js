import express from "express";
import connectDB from "./config/db.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import productRoutes from './routes/productRoutes.js';
// 解析.env环境变量
dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use('/api/user', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/order', orderRoutes )

app.listen(port, () => {
  console.log(`Server running in ${port} `);
})