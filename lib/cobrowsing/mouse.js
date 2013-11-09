define(['jquery', 'socketio', 'cobrowsing/elements'], function($, io, elements) {

    return function(socket, room) {

        // Start Listeners
        $(document).mousemove(mousemove);

        socket.on('cursor-update', function(data) {
            console.log('recieved: ' + JSON.stringify(data));
            updatePosition(data);
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
                };console.log(lastMessage);
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