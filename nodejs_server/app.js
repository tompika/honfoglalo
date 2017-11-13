// Import the Express module
var express = require('express');


// Import the 'path' module (packaged with Node.js)
//var path = require('path');

// Create a new instance of Express
var app = express();

// Create a Node.js based http server on port 8080
var server = require('http').createServer(app).listen(process.env.PORT || 8080);

// Create a Socket.IO server and attach it to the http server
var io = require('socket.io').listen(server);


//http kereshez
const http = require('http');

// Add headers
app.use(function(req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  console.log("HEADERS");

  // Pass to next layer of middleware
  next();
});




// routing
app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/game', function(req, res) {
  res.sendfile(__dirname + '/game.html');
});

app.get('/getData', function (req, res) {
	var asd = 5;
	res.json(asd);
})

// usernames which are currently connected to the chat
var usernames = {};
var userready = {};

// rooms which are currently available in chat
var rooms = ['room1'];




console.log("SERVER PORT: 8080");
//---------------------------------

process.stdin.resume(); //so the program will not close instantly
function exitHandler(options, err) {
  if (options.cleanup) {
    console.log('clean');
  }
  if (err)
    console.log(err.stack);
  if (options.exit)
    process.exit();
}
//do something when app is closing
process.on('exit', exitHandler.bind(null, {
  cleanup: true
}));
//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {
  exit: true
}));
// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {
  exit: true
}));
process.on('SIGUSR2', exitHandler.bind(null, {
  exit: true
}));
//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {
  exit: true
}));


//----------------------------

// Reduce the logging output of Socket.IO
io.set('log level', 3);

io.sockets.on('connection', function(socket) {

  //ha valaki csatlakozik
  console.log('client connected: ', socket.id);
    io.emit('message', {from: 'SERVER', text: "Lets the game begins!"});

//ha valaki kuldott valaszt
  socket.on('answer', (answer) => {

    io.emit('answerResult', 'varakozz csira mig a tobbi is valaszol!');


    //KERES KULDES SERVICBOL
    var data = '';
    http.get('http://localhost:8090/SpringBootBasic/api/question/', (resp) => {
      resp.on('data', (chunk) => {
        data += chunk;
        //kuldunk egy kerdest nekik
        io.emit('question', data);
        console.log("QUESTION: " + data)
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });


    console.log(answer.from + "-tol kapott valasz: " + answer.btn_id);
  });

  socket.on('rdyusers', function() {
	  var asd = 5;
	  return asd;
	  });


  socket.on('add-message', (data) => {
    io.emit('message', data);

    console.log(data.from + ": " + data.text);

  });


  // when the client emits 'adduser', this listens and executes
  socket.on('adduser', function(username) {

    console.log("Add User: " + username);
    // store the username in the socket session for this client
    socket.username = username;
    //player status
    socket.ready = false;
    // store the room name in the socket session for this client
    socket.room = 'room1';
    // add the client's username to the global list
    usernames[username] = username;
    // send client to room 1
    socket.join('room1');
    // echo to client they've connected
    socket.emit('updatechat', 'SERVER', 'you have connected to room1');
    // echo to room 1 that a person has connected to their room
    socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
    socket.emit('updaterooms', rooms, 'room1');
  });

  // when the client emits 'sendchat', this listens and executes
  socket.on('sendchat', function(data) {
    // we tell the client to execute 'updatechat' with 2 parameters
    io.sockets.in(socket.room).emit('updatechat', socket.username, data);
  });

  socket.on('newGame', function(username) {

    //printSockets();

    if (userGameReady[username] == username) {
      console.log('Mar felvettunk a ready listába csíra!!');
      return;
    }

    userGameReady[username] = username;

    console.log("Elmentve a ready listaba: ", username);
    console.log(userGameReady);
    console.log(Object.keys(userGameReady).length);


    if (Object.keys(userGameReady).length == 3) {
      console.log("---- MEGLETT A 3 JATEKOS INDUL A MENET! -----");

      io.sockets.in(socket.room).emit('start_new_game', socket.username, data);
    }


  });



  socket.on('ready', function(){
	 socket.ready = true;
	 userready[socket] = socket;
	 console.log('user ready: ' + socket.username);
	 console.log('ready users: ' + Object.keys(userready).length)

   io.emit("readyCount", Object.keys(userready).length);
  });

  socket.on('getNumberOfReadyPlayers', function(){

  });

  socket.on('switchRoom', function(newroom) {
    // leave the current room (stored in session)
    socket.leave(socket.room);
    // join new room, received as function parameter
    socket.join(newroom);
    socket.emit('updatechat', 'SERVER', 'you have connected to ' + newroom);
    // sent message to OLD room
    socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username + ' has left this room');
    // update socket session room title
    socket.room = newroom;
    socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username + ' has joined this room');
    socket.emit('updaterooms', rooms, newroom);
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function() {

	console.log('disconnect', socket.id);
    // remove the username from global usernames list
    delete usernames[socket.username];
    // update list of users in chat, client-side
    io.sockets.emit('updateusers', usernames);
    // echo globally that this client has left
    socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
    socket.leave(socket.room);

    //console.log('Client size: ', io.sockets.clients().length);

  });
});
