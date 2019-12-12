const host = '127.0.0.1';
const port = 3001
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var messages = [];

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

app.get('/pgpkey.html', function(req, res) {
  res.sendFile(__dirname + '/pgpkey.html')
});

app.get('/js/main.js', function(req, res) {
  res.sendFile(__dirname + '/js/main.js')
});

app.get('/js/sockets.js', function(req, res) {
  res.sendFile(__dirname + '/js/sockets.js')
});

app.get('/messages', function(req, res) {
  res.type('json')
  res.send(messages);
});

io.on('connection', function(socket){
  socket.on('message sent', function(msg) {
    console.log(msg);
    messages.push(msg);
    socket.broadcast.emit('message recieved', msg);
  })
});

http.listen(port, function() {
	console.log('Server running on http://' + host + ':' + port);
});
