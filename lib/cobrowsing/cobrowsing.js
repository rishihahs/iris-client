define(['jquery', 'socketio', 'cobrowsing/mouse'], function($, io, mouse) {
    return function(socket, room) {

        mouse(socket, room);

    };
});