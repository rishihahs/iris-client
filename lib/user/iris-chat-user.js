define(['jquery', 'socketio'], function($, io) {
    var socket = io.connect('http://localhost:3000');
    socket.on('connect', function() {
        // socket connected
        console.log('connected');
        socket.emit('subscribe');
    });
    socket.on('start', function(data) {
        console.log(data);
        // server emitted a custom event
    });
    socket.on('chat', function(data) {
        console.log(data);
    });
    socket.on('disconnect', function() {
        // socket disconnected
        console.log('yoconnected');
    });
});