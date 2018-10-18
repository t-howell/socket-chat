
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
//Storing names list on the server side so that new users have a full list of online contacts.
const userData = [];
const namesList = [];
let connectedUsers = {};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  
    socket.on('disconnect', function(name){
      // console.log(userData.indexOf(socket.id));
      
      if (socket.id !== -1) {
        //Get the index of the disconnected user
        index = userData.findIndex(x => x.id == socket.id);
        //Get the name by index
        let data = Object.keys(userData)[index];
        nameValue = userData[data].name;
        console.log('name is ' + nameValue);
        //
        console.log('names: ' + namesList);
        //Remove name from namesList
        //Get the index of name
        nameIndex = namesList.findIndex(x => x == nameValue);
        // console.log(nameIndex);
        //remove
        namesList.splice(nameIndex);
        // console.log('revised' + namesList);
        // console.log('userData Index ' + index);

        //remove disconnected user data
        // console.log(userData);
        userData.splice(index, 1);
        // console.log(userData);
        // console.log(user);
        console.log(socket.id + ' user disconnected');
        
        // let username = userData.filter(function(i){return (i == name)});
        io.emit('disconnect', namesList);
        // userData.splice(userData.indexOf(socket.id), 1);
        // console.log('The name is ' + username);
           
      }
        
      });
      // socket.on('sign-out', function(user){
      //   // let name = userData.filter(function(i){return (i == user)});
      //   // console.log('The name is ' + name);

      //   io.emit('sign-out', user, namesList);
      // });
    socket.on('sign-in', function(user){
      console.log(socket.id);
      //adding username and id to the list
      let userObj = {
        id: socket.id,
        name: user
      };
      //Add name and id to userData (server)
      userData.push(userObj);
      //Add name to namesList (client)
      namesList.push(userObj.name);

      console.log(namesList);
      console.log(userData);
      io.emit('sign-in', user, namesList);
    });
      socket.on('chat message', function(msg){
          io.emit('chat message',msg);
      });
});

//serving static files
app.use(express.static('public'));


http.listen(3000, function(){
  console.log('listening on *:3000');
});
