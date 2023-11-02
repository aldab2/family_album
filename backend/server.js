import express from 'express';
import dotenv from 'dotenv';
import  authRoutes from './routes/authRoutes.js'
import { errorHandler, notFound } from './controllers/middleware/errorMiddleware.js';

dotenv.config();
const app = express();
const PORT =process.env.PORT || 5000;
app.use('/api/auth',authRoutes)


app.get('/', (req, res) => {
  res.send('API is Running!');
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
