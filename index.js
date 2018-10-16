let app = require('express')();
let express = require('express');
let http = require('http').Server(app);
let io = require('socket.io')(http);
//Storing names list on the server side so that new users have a full list of online contacts.
const namesList = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    // console.log('a user has connected');
    socket.on('disconnect', function(user){
        console.log('user disconnected');
        
        
      });
      socket.on('sign-out', function(user){
        let name = namesList.filter(function(i){return (i == user)});
        console.log('The name is ' + name);
        // let name = namesList.filter(function(i){return (i == user)});
        console.log(user);
        // namesList.splice(list.indexOf(name), 1);
        console.log(namesList);
        io.emit('sign-out', user, namesList);
      });
    socket.on('sign-in', function(user){
      
      //adding username to the list
      namesList.push(user);
      io.emit('sign-in', user, namesList);
      // console.log(namesList);
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