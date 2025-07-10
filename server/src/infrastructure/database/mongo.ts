import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const MONGO_URI = process.env.MONGO_URI as string;
    if (!MONGO_URI) throw new Error('MongoDB URI is missing in environment variables');

    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    process.exit(1); // Exit if DB connection fails
  }
};
