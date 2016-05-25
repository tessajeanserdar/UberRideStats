const express = require('express');
const request = require('request');
const connection = require('./db');
const cors = require('cors');


const app = express();
app.listen(process.env.PORT || 3000)
app.use(express.static(__dirname + '/../public'));
app.use(cors());
require('../server/routes.js')(app, express);

// const io = require('socket.io').listen(app.listen(process.env.PORT || 3000));
// io.sockets.on('connection', function(socket){
//     console.log("listing on socket")
//     setInterval(function(){

//         socket.emit('date', {'date': new Date()});
//     }, 2000);
// });

