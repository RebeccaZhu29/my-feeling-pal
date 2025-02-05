import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/wellbeing-tracker', {
  // Add recommended options
  retryWrites: true,
  w: 'majority'
})
  .then(() => {
    console.log('🎉 Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

const db = mongoose.connection;

// Add error handler
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

export default db;
