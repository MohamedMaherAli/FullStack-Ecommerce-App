import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import userRoutes from './routes/user.js';
import productRoutes from './routes/product.js';
import orderRoutes from './routes/order.js';
import { notFound, errorHandler } from './middleware/error.js';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_CONNECTION = process.env.MONGO_CONNECTION;

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

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

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

//Fallback for url 404 errors
app.use(notFound);

//custom error handler middleware
app.use(errorHandler);

//DB and server connection
mongoose
  .connect(MONGO_CONNECTION)
  .then(() => app.listen(PORT, () => console.log(`server started at ${PORT}`)))
  .catch((error) => console.log(error));
