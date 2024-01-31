import express from 'express';
import dotenv from 'dotenv';
import  authRoutes from './routes/authRoutes.js'
import  postRoutes from './routes/postRoutes.js'
import friendRoutes from './routes/friendRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';


dotenv.config();
connectDB();
const app = express();
const PORT =process.env.PORT || 5000;
//Allows to parse raw json in body
app.use(express.json());
//Allows us to send form data and parse them
app.use(express.urlencoded({extended:true}));
//Allows us to access cookies from requests as req.cookies.<cookeiName>
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes)
app.use('/api/friend',friendRoutes)


app.get('/', (req, res) => {
  res.send('API is Running!');
});

app.use(notFound);
app.use(errorHandler);



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
