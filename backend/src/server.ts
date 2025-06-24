import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import mongoose from 'mongoose';
import connectDB from './config/database';
import passport from './middleware/passport';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // React Web URL
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, 
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'LogEmotion API Server is running!',
    status: 'success',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    database: 'connected',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get('/test-db', async (req, res) => {
  try {
    const TestModel = mongoose.model('Test', new mongoose.Schema({
      message: String,
      timestamp: { type: Date, default: Date.now }
    }));

    const testDoc = new TestModel({ 
      message: 'LogEmotion DB Connection Test',
      timestamp: new Date()
    });
    
    await testDoc.save();

    const count = await TestModel.countDocuments();
    
    res.json({
      success: true,
      message: 'Database connection working!',
      documentsCount: count,
      lastDocument: testDoc,
      databaseName: mongoose.connection.name,
      connectionState: mongoose.connection.readyState
    });
  } catch (error) {
    res.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      connectionState: mongoose.connection.readyState
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});

export default app;