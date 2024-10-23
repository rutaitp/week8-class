//Express server setup
let express = require('express');
let app = express();

//Serve public folder
app.use(express.static('public'));

//Step 5. HTTP Server
let http = require('http');
let server = http.createServer(app);

//Listen
let port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('Server is listening on localhost: ' + port);
});

//Socket code
//7. Start a socket server
const { Server } = require('socket.io');
const io = new Server(server);

//8. Establish socket connection
io.on('connection', (socket) => {
  console.log('We have a new client: ' + socket.id);

  //13. listen for data coming in
  socket.on('data', (data) => {
    console.log(data);
    //send to all clients, including us
    io.emit('data', data);
  });

  //20.
  socket.on('colorChange', () => {
    io.emit('colorChange');
  });

  //9. disconnect
  socket.on('disconnect', () =>{
    console.log('A client disconnected: ' +  socket.id);
  });
});
