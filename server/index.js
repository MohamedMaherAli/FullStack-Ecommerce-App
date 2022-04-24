import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.js';
import productRoutes from './routes/product.js';
import orderRoutes from './routes/order.js';
import { notFound, errorHandler } from './middleware/error.js';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_CONNECTION = process.env.MONGO_CONNECTION;

//cors config
app.use(cors());

//parser config
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

//ROUTES
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

//this route just to get paypal credentials from the environment variable
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

//Fallback for url 404 errors
app.use(notFound);

//custom error handler middleware
app.use(errorHandler);

//DB and server connection
mongoose
  .connect(MONGO_CONNECTION)
  .then(() => app.listen(PORT, () => console.log(`server started at ${PORT}`)))
  .catch((error) => console.log(error));
