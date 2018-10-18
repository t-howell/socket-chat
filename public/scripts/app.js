window.onload = function() {
    //create socket variable
    let socket = io();
    //get button to listen for submit
    let btn = document.getElementById('submit-button');
    //create messages variable for output message display
    let messages = document.getElementById('messages');
    //get current message from textarea 
    let message = document.getElementById('message');
    //get contacts section
    let contactList = document.getElementById('contacts-list');

    //get modal div
    let modalDiv = document.getElementById('modal');
    //hide modal on submit
    let nameSubmit = document.getElementById('name-submit');

    nameSubmit.addEventListener('click', function(e) {
        e.preventDefault();
        //set name
        let username = document.getElementById('username').value;
        localStorage.setItem("username", username);
        //send username to server
        socket.emit('sign-in', username);
        //remove modal
        modalDiv.classList.add('hidden');
        return false;
    });

    //listen for click event, emit chat message event
    btn.addEventListener('click', function(e){
        e.preventDefault();
        //catch and emit the message value and sender's username
        socket.emit('chat message', message.value, localStorage.getItem('username'));
        return false;
    });
    //listen for connections, add usernames
    socket.on('sign-in', function(user, namesList){
        // console.log(user);
        // console.log(namesList);
        //
        console.log(Object.values(namesList));
        //Iterate
        contactList.innerHTML="";
        namesList.forEach(function(user){
            //create new li
            let node = document.createElement('LI');
            //set the value to given username and add to list
            node.innerHTML = user;
            contactList.append(node);

        });
    });
    

    socket.on('disconnect', function(namesList){
        //
        // let name = namesList.filter(function(i){return (i == user)});
        // console.log(name);
        // let name = localStorage.getItem('username');
        // socket.emit('disconnect', name);
        // namesList.remove(name);
        // localStorage.clear;
        console.log(namesList);
        //Reset contactList
        contactList.innerHTML="";
        // console.log(Object.values(namesList));
        //Iterate
        namesList.forEach(function(user){
            //create new li
            console.log(user);
            console.log(namesList);
            let node = document.createElement('LI');
            //set the value to given username and add to ul
            node.innerHTML = user;
            contactList.append(node);
        });

    });
    //listen for chat message event, add new message to display
    socket.on('chat message', function(msg, user){

        //create new message node variable
        let messageNode = document.createElement('LI');

        //add the message value to the new message element
        messageNode.innerHTML = (user + ': ' + msg);
        messages.append(messageNode);

        //get form for reset
        let form = document.getElementById('message-form');
        form.reset();

        
    });
}
//listen for disconnect, remove usernames
// window.addEventListener(onunload, function(){
        
//     let username = localStorage.getItem('username');
//     socket.emit('sign-out', username);
// });