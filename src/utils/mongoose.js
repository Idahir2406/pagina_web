import mongoose from 'mongoose';

const conn = {
  isConnected: false
};

export const connectDB = async () => {
  if (conn.isConnected) return;
  const db = await mongoose.connect(process.env.MONGO_URI);
  conn.isConnected = db.connections[0].readyState;
};

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('Error connecting to MongoDB', err);
});

export default mongoose;
