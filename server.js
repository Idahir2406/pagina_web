const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

// Configurar eventos de Socket.IO
io.on('connection', (socket) => {

  // Manejar eventos
  socket.on('mensaje', async(data) => {
    const res = await fetch(
      `http://localhost:3000/api/user/${data}`
    );
    const userData = await res.json();
    io.emit('evento', userData);
  });

  socket.on('updateProfile', async(data) => {
    
    io.emit('profileResponse', data);

  })

});

// Iniciar el servidor HTTP
httpServer.listen(3001, () => {
  console.log('Servidor Socket.IO en ejecución en http://localhost:3001');
});
