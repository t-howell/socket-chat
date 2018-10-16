let app = require('express')();
let express = require('express');
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    // console.log('a user has connected');
    // socket.on('disconnect', function(){
    //     console.log('user disconnected');
    //   });
    socket.on('sign-in', function(user){
      io.emit('sign-in', user);
    });
      socket.on('chat message', function(msg){
        //   console.log('message:' + msg);
          io.emit('chat message',msg);
      });
    //   socket.broadcast.emit('hi');
    //   socket.on()
});

//serving static files
app.use(express.static('public'));


http.listen(3000, function(){
  console.log('listening on *:3000');
});