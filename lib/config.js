//The build will inline common dependencies into this file.

requirejs.config({
    baseUrl: './lib',
    paths: {
        'socketio': 'deps/socket.io'
    },
    shim: {
        'socketio': {
            exports: 'io'
        }
    }
});