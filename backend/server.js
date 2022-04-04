import express from "express";
import db from './config/database.js';
import productRouter from "./routes/ProductRouter.js";
import cors from "cors";
import brandRouter from "./routes/brandRouter.js";
import userRouter from "./routes/userRouter.js";
import dotenv from "dotenv";
import path from 'path';
import orderRouter from "./routes/orderRouter.js";
import shipRouter from "./routes/shipRouter.js";
import orderDetailRouter from "./routes/orderDetailRouter.js";
import commentRouter from "./routes/commentRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import uploadRouter from "./routes/uploadRouter.js";
import {OAuth2Client} from 'google-auth-library';
import blogRouter from "./routes/blogRouter.js";
import contactRouter from "./routes/contactRouter.js";


dotenv.config();
// const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID)


const app = express();

try {
  await db.authenticate();
  console.log('Database connected...');
} catch (error) {
  console.error('Connection error:', error);
}
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.use('/api/uploads', uploadRouter);

app.use('/api/products', productRouter);
app.use('/api/brands', brandRouter);
app.use('/api/categories', categoryRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)
app.use('/api/shipping', shipRouter);
app.use('/api/order-detail', orderDetailRouter);
app.use('/api/comments', commentRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/contacts', contactRouter);



app.get('/api/config/paypal',(req, res) => {
  res.send(process.env.PAYPAL_CLIENT__ID ||'sb')
});

app.use(express.static('./public'));

// static images folder
app.use('/uploads', express.static('./uploads'));

const __dirname = path.resolve();
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, '/frontend/build')));
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
// );

// app.use('/api/uploads')

app.get('/', function(req, res) {
  res.send('Hello World')
})
app.use((err, req, res,next) => {
  res.status(500).send({message: err.message})
})
const port=process.env.PORT ||5000;
app.listen(port,()=>{
    console.log(`Serve at http://localhost:${port}`);
})