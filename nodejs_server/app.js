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

var randomstring = require("randomstring");

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



// usernames which are currently connected to the chat
var usernames = [];
var userready = [];

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


function createRoom(){
var roomid = randomstring.generate(7);
var index = rooms.indexOf(roomid);
  if (index != -1) {
    createRoom();
  }else{
    console.log('roomid: ' + roomid);
    return roomid;
  }
}

//----------------------------

// Reduce the logging output of Socket.IO
io.set('log level', 3);

io.sockets.on('connection', function(socket) {

  //ha valaki csatlakozik
  console.log('client connected: ', socket.id);
    io.emit('message', {from: 'SERVER', text: "Lets the game begins!"});
/*
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
*/

  socket.on('getrandomquestions',function(){
          console.log('getrandomquestions: ' + socket.question);
          socket.emit('getrandomquestions', socket.question);

});


socket.on('getFriendList',function(username){
    var data = '';
    http.get('http://localhost:8090/SpringBootBasic/api/getfriendlist/'+username ,(resp) => {
      resp.on('data', (chunk) => {
        data += chunk;
        socket.emit("setFriendList",JSON.parse(data));
        console.log('friendlist for: ' + username + ' Friendlist: ' + data);
        });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
});
// TODO visszajelzés h sikeres volt e (springben most nullt ad vissza)
socket.on('friendRequest',function(who,to){
    console.log('addfriend who: ' + who + 'to: ' + to);
    var data = '';
    var data2 = [];
    var toarray = [];
    var whoarray = [];
    http.get('http://localhost:8090/SpringBootBasic/api/addfriend/'+ who + ',' + to,(resp) => {
      resp.on('data', (chunk) => {
        data += chunk;

        if (data != "HIBA") {
          data2 = data.split('&&');
          whoarray = data2[0].split(',');
          toarray = data2[1].split(',');

          usernames.forEach(function(value){
            if (value.username === to) {
              value.emit('setFriendList',toarray);
            }
            if (value.username === who) {
              value.emit('setFriendList',whoarray);
            }
          });
        }else {
          socket.emit('addFriendError');
          console.log('fos');
        }



        });
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
});

socket.on('removeFriend',function(who,to){
  console.log('removefriend who: ' + who + 'to: ' + to);
  var data = '';
  var data2 = [];
  var toarray = [];
  var whoarray = [];
  http.get('http://localhost:8090/SpringBootBasic/api/removefriend/'+ who + ',' + to,(resp) => {
    resp.on('data', (chunk) => {
      data += chunk;
      data2 = data.split('&&');
      whoarray = data2[0].split(',');
      toarray = data2[1].split(',');

      if (whoarray.length == 1 && whoarray[0] === '') {
        whoarray.splice(0,1);
      }

      if (toarray.length == 1 && toarray[0] === '') {
        toarray.splice(0,1);
      }

      console.log(whoarray);
      console.log(toarray);

      usernames.forEach(function(value){
        if (value.username === to) {
          value.emit('setFriendList',toarray);
        }
        if (value.username === who) {
          value.emit('setFriendList',whoarray);
        }
      });

      });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
});


socket.on('inviteFriend',function(who,to){
  console.log("inviteFriend: " + who + 'to: ' + to);
  usernames.forEach(function(value){
    if (value.username === to) {
      console.log('invite to: ' + value.username + 'same as: ' + to);
      value.emit('getInvite',{who:who,to:to});
    }
  });
});
socket.on('inviteResponse',function(response,who){
    if (response === 'accept') {
      socket.lobby.push(socket);
      var index = userready.indexOf(socket);
      if (index > -1) {
        userready.splice(index, 1);
      }
      usernames.forEach(function(value){
        if (value.username === who) {
          console.log('response who: ' + value.username + 'same as: ' + who);
          index = userready.indexOf(value);
          if (index > -1) {
            userready.splice(index, 1);
          }
          socket.lobby.push(value);
          value.lobby.push(value);
          value.lobby.push(socket);
          //value.emit('getInvite',{who:who,to:to});
        }
      });
      var data = '';
      http.get('http://localhost:8090/SpringBootBasic/api/randomquestions/', (resp) => {
        resp.on('data', (chunk) => {
          data += chunk;
          console.log("QUESTIONS: " + data)
          var room = createRoom();
          socket.lobby.forEach(function(value){
            value.question = JSON.parse(data);
            value.leave(value.room);
            value.join(room);
            value.emit('updatechat', 'SERVER', 'you have connected to ' + room);
            value.broadcast.to(value.room).emit('updatechat', 'SERVER', value.username + ' has left this room');
            value.room = room;
            value.broadcast.to(room).emit('updatechat', 'SERVER', value.username + ' has joined this room');
            value.emit('updaterooms', rooms, room);
            value.gameReady = true;
            console.log('name: ' + value.username);
            //console.log('data: ' + value.question);

          });

        });
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });
      io.sockets.in(socket.room).emit("game", true);

    }else {
      //TODO
    }
});



  socket.on('checkReadyGame', function(){
    console.log('ready player number ' + userready.length);
    if (userready.length >= 2 ) {
      //TODO meg kell nézni van e már ilyen
      var room = createRoom();
      rooms.push(room);

      userready[0].lobby.push(userready[0]);
      userready[0].lobby.push(userready[1]);
      userready[1].lobby.push(userready[1]);
      userready[1].lobby.push(userready[0]);



      //remove first 2 element;
      userready.splice(0, 2);


      //questions
      var data = '';
      http.get('http://localhost:8090/SpringBootBasic/api/randomquestions/', (resp) => {
        resp.on('data', (chunk) => {
          data += chunk;
          console.log("QUESTIONS: " + data)
          socket.lobby.forEach(function(value){
            value.question = JSON.parse(data);
            value.leave(value.room);
            value.join(room);
            value.emit('updatechat', 'SERVER', 'you have connected to ' + room);
            value.broadcast.to(value.room).emit('updatechat', 'SERVER', value.username + ' has left this room');
            value.room = room;
            value.broadcast.to(room).emit('updatechat', 'SERVER', value.username + ' has joined this room');
            value.emit('updaterooms', rooms, room);
            value.gameReady = true;
            console.log('name: ' + value.username);
            //console.log('data: ' + value.question);

          });
          io.sockets.in('room1').emit('getreadycount', userready.length);
          io.sockets.in(socket.room).emit("game", true);
        });
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });
      console.log(socket.room);
    }
  });


  socket.on('sendresult',(data) => {
      console.log('sendresult data: ' + data.answer);
      socket.result = data.answer;
      //userready[0].result = data.answer;
      if (socket.lobby[0].result != '' && socket.lobby[1].result != ''){
        console.log('fasza');

        console.log('p1 result: '  + socket.lobby[0].result);
        console.log('p2 result: '  + socket.lobby[1].result);
        console.log('p1 q: '  + socket.lobby[0].question[data.stage].question);
        console.log('p2 q: '  + socket.lobby[1].question[data.stage].question);

        if (socket.lobby[0].question[data.stage].canswer === socket.lobby[0].result) {
          console.log('trueeeeee');
          socket.lobby[0].score = socket.lobby[0].score + 200;
        }
        if (socket.lobby[1].question[data.stage].canswer === socket.lobby[1].result) {
          socket.lobby[1].score = socket.lobby[1].score + 200;
        }

        console.log('p1 score: '  + socket.lobby[0].score);
        console.log('p2 score: '  + socket.lobby[1].score);
        console.log('p1 result: '  + socket.lobby[0].result);
        console.log('p2 result: '  + socket.lobby[1].result);
//TODO csere ciklusokra
        io.sockets.in(socket.room).emit("getresult",{s1:socket.lobby[0].score,s2:socket.lobby[1].score,
                             p1:socket.lobby[0].username,p2:socket.lobby[1].username,
                             r1:socket.lobby[0].result,r2:socket.lobby[1].result});
        socket.lobby[0].result = '';
        socket.lobby[1].result = '';
      }

  });


//TODO csere ciklusokra
  socket.on('sendpreset',function(){
    console.log('preset');
    socket.lobby[0].result = '';
    socket.lobby[1].result = '';
    socket.lobby[0].score = 0;
    socket.lobby[1].score = 0;
    socket
      .emit("getpreset",{s1:socket.lobby[0].score,s2:socket.lobby[1].score,
                         p1:socket.lobby[0].username,p2:socket.lobby[1].username,
                         r1:socket.lobby[0].result,r2:socket.lobby[1].result});
  });

  socket.on('add-message', (data) => {
    io.sockets.in(socket.room).emit('message', data);
    console.log(data.from + ": " + data.text + " from room: " + socket.room);

  });


  // when the client emits 'adduser', this listens and executes
  socket.on('adduser', function(username) {

    console.log("Add User: " + username);
    // store the username in the socket session for this client
    socket.username = username;
    //player status (lobby ready)
    socket.ready = false;
    //gameReady
    socket.gameReady = false;
    //answer
    socket.result = '';
    //question array
    socket.question = [];
    //gae score
    socket.score = 0;
    //stage
    socket.stage = 0;
    //lobby for user for private game
    socket.lobby = [];
    // store the room name in the socket session for this client
    socket.room = 'room1';
    // add the client's username to the global list
    //usernames[username] = username;
    usernames.push(socket);
    // send client to room 1
    socket.join('room1');
    // echo to client they've connected
    socket.emit('message', {from: 'SERVER', text: 'you have connected to room1'});
    // echo to room 1 that a person has connected to their room
    socket.broadcast.to('room1').emit('message', 'SERVER' + username + ' has connected to this room');
    //socket.emit('updaterooms', rooms, 'room1');
  });

  // when the client emits 'sendchat', this listens and executes
  socket.on('sendchat', function(data) {
    // we tell the client to execute 'updatechat' with 2 parameters
    console.log('sendchat ' + socket.room);
    io.sockets.in(socket.room).emit('updatechat', socket.username, data);
  });

  socket.on('endgame', function() {
    console.log('endgame');
    //rooms

    socket.leave(socket.room);
    // join new room, received as function parameter
    socket.join('room1');
    socket.emit('updatechat', 'SERVER', 'you have connected to ' + 'room1');
    // sent message to OLD room
    socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username + ' has left this room');
    // update socket session room title
    socket.room = 'room1';
    socket.broadcast.to('room1').emit('updatechat', 'SERVER', socket.username + ' has joined this room');
    socket.emit('updaterooms', rooms, 'room1');

    //socket variables
    socket.gameReady = false;
    socket.ready = false;
    socket.lobby = [];
    socket.result = '';
    socket.question = [];
    socket.score = 0;
    socket.stage = 0;

  });



  socket.on('ready', function(){
	 socket.ready = true;
	 userready.push(socket);
	 console.log('user ready: ' + socket.username);
	 console.log('ready users: ' + userready.length)

   io.emit("readyCount", userready.length);
  });

  socket.on('notReady',function(){
    console.log('notready: ' + socket.username);
    var index = userready.indexOf(socket);
    if (index > -1) {
      userready.splice(index, 1);
    }
    socket.ready = false;
    io.emit('getreadycount', userready.length);
  });

  socket.on('getreadycount', function(){
    io.emit('getreadycount', userready.length);
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



  socket.on('logout',function(){
    var index = usernames.indexOf(socket);
    if (index > -1) {
      usernames.splice(index, 1);
    }
    console.log('removeuser: ' + socket.username);
    console.log('index: ' + usernames.indexOf(socket));
    socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
    socket.leave(socket.room);
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function() {
	  console.log('disconnect', socket.id);
    // remove the username from global usernames list
    //delete usernames[socket.username];

    var index = usernames.indexOf(socket);
    if (index > -1) {
    usernames.splice(index, 1);
    }
    console.log('username size: ' + usernames.length);
    index = userready.indexOf(socket);
    if (index > -1) {
    userready.splice(index, 1);
    }
    //TODO ez még itt szar (FIXED)
    //userready.pop();
    // update list of users in chat, client-side
    console.log('userready size: ' + userready.length);
    //io.sockets.emit('updateusers', usernames);
    // echo globally that this client has left
    socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
    socket.leave(socket.room);

    //console.log('Client size: ', io.sockets.clients().length);

  });
});
