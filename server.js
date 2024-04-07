 var express = require('express');
  var app = express();
var socket = require('socket.io');
 
 
app.get('/', function(request, response){
  response.sendfile(__dirname);
});
var activeClients = 0;
 
//nodejs server listens to msgs on port 8080
var server = app.listen(3000);
//io sockets would address to all the web-clients talking to this nodejs server
var io = socket.listen(server);
 
//using node-osc library: 'npm install node-osc'
//this will also install 'osc-min'

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
     
 
