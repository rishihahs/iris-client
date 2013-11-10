define(['jquery', 'socketio', 'cobrowsing/mouse', 'cobrowsing/form'], function($, io, mouse, form) {
    return function(socket, room) {

        mouse(socket, room);
        form(socket, room);

    };
});