import dotenv from 'dotenv';
dotenv.config();

import app from './config/app';
import { connectDB } from './infrastructure/database/mongo';

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
