import express from 'express';
import productRoutes from './routes/productRoutes';
import cartRoutes from './routes/cartRoutes';
import sequelize from './config/database';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/products', productRoutes);
app.use('/cart', cartRoutes);


sequelize.sync().then(() => {
  console.log('Database synchronized');
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Database synchronization error:', err);
});
