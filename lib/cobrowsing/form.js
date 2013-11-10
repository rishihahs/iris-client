define(['jquery', 'socketio', 'cobrowsing/elements'], function($, io, elements) {

    return function(socket, room) {

        // Set up event handlers
        $(document).on('focusin', focusElement);
        $(document).on('keyup', keyPress);

        socket.on('form-keypress', function(data) {
            $(elements.findElement(data.element)).val(data.val);
        });

        socket.on('form-focus', function(data) {
            $(elements.findElement(data.element)).trigger('focus', ['irisEvent']);
        });

        function focusElement(event, param) {
            if (param === 'irisEvent') {
                return;
            }

            var target = event.target;
            if (elements.ignoreElement(target)) {
                return;
            }

            socket.emit('form-focus', {
                type: "form-focus",
                element: elements.elementLocation(target),
                room: room
            });
        }

        function keyPress(event) {
            if (elements.ignoreElement(event.target)) {
                return;
            }

            socket.emit('form-keypress', {
                type: 'form-keypress',
                element: elements.elementLocation(event.target),
                val: $(event.target).val(),
                room: room
            });
        }
    };

});