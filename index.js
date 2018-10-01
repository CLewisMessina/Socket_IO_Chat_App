const   express = require('express'),
        app = express(),
        socket = require('socket.io'),
        ejs = require('ejs');

//APP CONFIGURATION
app.set('view engine', 'ejs');
app.use(express.static('public'));
var server = app.listen(process.env.PORT || 3000, function(){
    console.log('The Socket.io Chat App server has started.');
});


app.get('/', (req, res) =>{
    res.render('index');
});

// SOCKET CONFIGURATION
var io = socket(server);

io.on('connection', (socket)  => {
    console.log(`Client ${socket.id} made a socket connection`);

    socket.on('chat', (data)=>{
        // io.emit('chat', data);
      io.sockets.emit('chat', data);
    });

    socket.on('typing', (data) =>{
        socket.broadcast.emit('typing', data);
    });
});

