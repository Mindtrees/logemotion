import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<typeof mongoose> => {
  try {
    console.log('Attempting to connect to MongoDB...');
    
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is not set. Please check your .env file.');
    }

    const safeUri = mongoUri.replace(/:([^:@]{8})[^:@]*@/, ':$1***@');
    console.log('Connection URI:', safeUri);
    
    const conn = await mongoose.connect(mongoUri);

    console.log(`✅ MongoDB connected successfully: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    mongoose.connection.on('error', (err: Error) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });

    return conn;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
};

export default connectDB;