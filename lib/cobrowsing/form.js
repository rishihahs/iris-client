define(['jquery', 'socketio', 'cobrowsing/elements'], function($, io, elements) {

    return function(socket, room) {

        // Set up event handlers
        $(document).on('focusin', focusElement);
        $(document).on('keyup', keyPress);
        $(document).on('change', change);

        socket.on('form-keypress', function(data) {
            $(elements.findElement(data.element)).val(data.val);
        });

        socket.on('form-focus', function(data) {
            $(elements.findElement(data.element)).trigger('focus', ['irisEvent']);
        });

        socket.on('form-change', function(data) {
            setValue(elements.findElement(data.element), data.value);
        });

        function change(event) {
            var target = event.target;
            if (elements.ignoreElement(target)) {
                return;
            }

            var value = getValue(target);
            socket.emit('form-change', {
                type: "form-change",
                element: elements.elementLocation(target),
                value: value,
                room: room
            });
        }

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

        function getValue(el) {
            el = $(el);
            if (isCheckable(el)) {
                return el.prop("checked");
            } else {
                return el.val();
            }
        }

        function setValue(el, value) {
            el = $(el);
            var changed = false;
            if (isCheckable(el)) {
                var checked = !! el.prop("checked");
                value = !! value;
                if (checked != value) {
                    changed = true;
                    el.prop("checked", value);
                }
            } else {
                if (el.val() != value) {
                    changed = true;
                    el.val(value);
                }
            }
        }

        function isCheckable(el) {
            el = $(el);
            var type = (el.prop("type") || "text").toLowerCase();
            if (el.prop("tagName") == "INPUT" && ["radio", "checkbox"].indexOf(type) != -1) {
                return true;
            }
            return false;
        }
    };

});