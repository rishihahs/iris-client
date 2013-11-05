//The build will inline common dependencies into this file.

requirejs.config({
    baseUrl: './lib',
    paths: {
        'socketio': 'deps/socket.io',
        'jquery': 'deps/jquery'
    },
    shim: {
        'socketio': {
            exports: 'io'
        }
    }
});