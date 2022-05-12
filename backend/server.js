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
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import mg from "mailgun-js"
import { isAuth } from "./utils.js";


dotenv.config();
// const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID)


const app = express();

try {
  await db.sequelize.authenticate();
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

const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMIAN,
});
  app.post('/api/email', (req, res) => {
    const { email, subject, message, name } = req.body;
    mailgun()
      .messages()
      .send(
        {
          from: `${email}`,
          to: `thanhlam241120@gmail.com`,
          subject: `${subject}`,
          html: `<p>${message}</p>`,
        },
        (error, body) => {
          if (error) {
            console.log(error);
            res.status(500).send({ message: 'Error in sending email' });
          } else {
            console.log(body);
            res.send({ message: 'Email sent successfully' });
          }
        }
      );
  });

app.post('/send_mail', cors(),async(req, res)=>{
  const { shippingAddress, cart, email } = req.body;

  try {
    let from = 'joy.nguyen.bot@gmail.com';
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        port: 587,
        auth: {
            user: from,
            pass: `${process.env.MAIL_PASS}`
        }
    });

    await transporter.sendMail({
        from: from,
        to: `${email}`,
        subject: 'Xác nhận đặt hàng thành công',
        html:` 
        <div style="background-color: rgb(223, 223, 223); padding: 20px">
            <div
                style="
                align-items: center;
                background-color: #fff;
                height: 100%;
                border-radius: 15px;
                padding: 20px;
                "
            >
                <h1 style="text-align: center; color: rgb(53, 186, 0)">
                Chúc mừng bạn ${shippingAddress.shippingAddress.fullName} đã đặt hàng thành công
                </h1>
                <p style="margin-top: 50px; font-size: 18px">
                Địa chỉ:
                <span> ${shippingAddress.shippingAddress.address}, ${shippingAddress.shippingAddress.city}, ${shippingAddress.shippingAddress.country}  </span>
                </p>
                <p style="margin-top: 50px; font-size: 18px">
                Số điện thoại:
                <span> ${shippingAddress.shippingAddress.phone}</span>
                </p>
                <p style="margin-top: 50px; font-size: 18px">
                Phương thức thanh toán:
                <span> ${cart.paymentMethod}</span>
                </p>
                <h1 style="margin-top: 50px; font-size: 18px">
                Giá trị đơn hàng:
                <span>$${cart.totalPrice}</span>
                <ul>
                  <li>Tổng tiền sản phẩm: $${cart.itemsPrice}</li>
                  <li>Phí vận chuyển: $${cart.shippingPrice}</li>
                  <li>Thuế: $${cart.taxPrice}</li>
                </ul>
                </h1>

                <p style="margin-top: 50px; font-size: 17px">Trân trọng,</p>
                <p style="font-size: 13px">JoyShop Team</p>
                <p style="font-size: 13px; font-style: italic; margin-top: 50px">
                *Đây là tin nhắn tự động vui lòng không reply lại. Xin trân trọng cảm ơn
                !!!
                </p>
            </div>
        </div>
`,
    });

    console.log('Email sent');
} catch (error) {
    console.log('Failed to send email: ', error);
}
})



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