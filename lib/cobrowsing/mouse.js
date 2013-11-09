define(['jquery', 'socketio', 'cobrowsing/elements'], function($, io, elements) {

    return function(socket, room) {

        // Start Listeners
        $(document).mousemove(mousemove);
        $(document).click(function(event, param) {
            documentClick(event, param, socket, room);
        });

        // Show mouse
        $('.iris-cursor').show();

        socket.on('cursor-update', function(data) {
            console.log('recieved: ' + JSON.stringify(data));
            updatePosition(data);
        });

        socket.on('cursor-click', function(data) {
            console.log('received click: ' + JSON.stringify(data));
            updatePosition(data);
            var target = $(elements.findElement(data.element));
            var offset = target.offset();
            var top = offset.top + data.offsetY;
            var left = offset.left + data.offsetX;
            target.trigger('click', ['irisEvent']);
        });

        var lastTime = 0;
        var MIN_TIME = 100;
        var lastPosX = -1;
        var lastPosY = -1;
        var lastMessage = null;

        function mousemove(event) {
            var now = Date.now ? Date.now() : new Date().getTime();
            if (now - lastTime < MIN_TIME) {
                return;
            }
            lastTime = now;
            var pageX = event.pageX;
            var pageY = event.pageY;
            if (Math.abs(lastPosX - pageX) < 3 && Math.abs(lastPosY - pageY) < 3) {
                // Not a substantial enough change
                return;
            }
            lastPosX = pageX;
            lastPosY = pageY;
            var target = event.target;
            var parent = $(target).closest(".iris-chat-module");
            if (parent.length) {
                target = parent[0];
            } else if (elements.ignoreElement(target)) {
                target = null;
            }
            if ((!target) || target == document.documentElement || target == document.body) {
                lastMessage = {
                    type: "cursor-update",
                    top: pageY,
                    left: pageX,
                    room: room
                };
                console.log(lastMessage);
                socket.emit('cursor-update', lastMessage);
                return;
            }
            target = $(target);
            var offset = target.offset();
            if (!offset) {
                // FIXME: this really is walkabout.js's problem to fire events on the
                // document instead of a specific element
                console.warn("Could not get offset of element:", target[0]);
                return;
            }
            var offsetX = pageX - offset.left;
            var offsetY = pageY - offset.top;
            lastMessage = {
                type: "cursor-update",
                room: room,
                element: elements.elementLocation(target),
                offsetX: Math.floor(offsetX),
                offsetY: Math.floor(offsetY)
            };
            socket.emit('cursor-update', lastMessage);
        }
    };

    // Clicked Page

    function documentClick(event, param, socket, room) {
        if (param === 'irisEvent') {
            return;
        }

        console.log('click:');
        console.log(event);
        var element = event.target;
        if (element == document.documentElement) {
            element = document.body;
        }

        if (elements.ignoreElement(element)) {
            return;
        }

        if (element.nodeName.toLowerCase() === 'video') {
            return;
        }

        var location = elements.elementLocation(element);
        var offset = $(element).offset();
        var offsetX = event.pageX - offset.left;
        var offsetY = event.pageY - offset.top;
        socket.emit('cursor-click', {
            type: "cursor-click",
            room: room,
            element: location,
            offsetX: offsetX,
            offsetY: offsetY
        });
    }

    function updatePosition(pos) {
        var top, left;
        if (pos.element) {
            var target = $(elements.findElement(pos.element));
            var offset = target.offset();
            top = offset.top + pos.offsetY;
            left = offset.left + pos.offsetX;
        } else {
            // No anchor, just an absolute position
            top = pos.top;
            left = pos.left;
        }

        console.log(top + ' ' + left);
        setPosition(top, left);
    }

    function setPosition(top, left) {
        $('.iris-cursor').css({
            top: top,
            left: left
        });
    }

});