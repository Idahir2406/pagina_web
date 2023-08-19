import {connect, connection, set} from 'mongoose';

const conn = {
  isConnected: false
};

export const connectDB = async () => {
  if (conn.isConnected) return;
  const db = await connect(process.env.MONGO_URI);
  conn.isConnected = db.connections[0].readyState;
};


connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

connection.on('error', (err) => {
  console.log('Error connecting to MongoDB', err);
});

connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

set("strictQuery",false)