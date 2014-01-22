 var express = require('express');
  var app = express();
var socket = require('socket.io');
 
 
app.get('/', function(request, response){
  response.sendfile(__dirname + "/index.html");
});
var activeClients = 0;
 
//nodejs server listens to msgs on port 8080
var server = app.listen(8080);
//io sockets would address to all the web-clients talking to this nodejs server
var io = socket.listen(server);
 
//using node-osc library: 'npm install node-osc'
//this will also install 'osc-min'
var osc = require('node-osc');
 
 
//listening to OSC msgs to pass on to the web via nodejs
var oscServer = new osc.Server(3334, '0.0.0.0');
//sending OSC msgs to a client
var oscClient = new osc.Client('130.229.146.234', 3333);
 
var message = new Array();
 
var message2 = new Array();
 
 
io.sockets.on('connection', function(socket){clientConnect(socket)});
  
function clientConnect(socket){
 
 
     activeClients +=1;
  //skicka ut activeclients till alla connectade
  io.sockets.emit('message', {clients:activeClients});
  //ta emot info om någon disconnectar
  socket.on('disconnect', function(){clientDisconnect()});
  console.log(activeClients);
 
 
  }
  
function clientDisconnect(){
  activeClients -=1;
  io.sockets.emit('message', {clients:activeClients});
}
     
 
     
    //received an osc msg
    oscServer.on("message", function (msg, rinfo) {
         
 
        console.log(rinfo);
        message = msg[2];
        message2 = msg[2];
        console.log(message);
        console.log(message[0]);
 
        if (message[0] == "/gyrosc/gyro"){
 
        //pass the msg on to all of the web-clients
        //msg[1] stands for the first argument received which in this case should be a string
        io.sockets.emit("gyro",message);
        //io.sockets.emit("serverMsg",message[0]);
        //io.sockets.emit("serverMsg1",message[1]);
        //io.sockets.emit("serverMsg2",message[2]);
        //io.sockets.emit("serverMsg3",message[3]);
        //io.sockets.emit("serverMsg3",message[4]);
    }
 
 
 
if (message[0] == "/gyrosc/accel"){
 
console.log(message);
 
        //pass the msg on to all of the web-clients
        //msg[1] stands for the first argument received which in this case should be a string
        io.sockets.emit("accel",message);
        //io.sockets.emit("serverMsg",message[0]);
        //io.sockets.emit("serverMsg1",message[1]);
        //io.sockets.emit("serverMsg2",message[2]);
        //io.sockets.emit("serverMsg3",message[3]);
     
 
}
});
