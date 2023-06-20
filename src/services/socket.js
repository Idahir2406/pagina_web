import io from 'socket.io-client';

const socket = io('http://localhost:3001',{
  transports: ['websocket', 'polling', 'flashsocket'],
  cors : {
    origin: 'http://localhost:3000',

  }
});

export default socket;