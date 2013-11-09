(function() {

    var socket = io.connect('http://localhost:3000');

    socket.on('connect', function() {
        // socket connected
        console.log('connected');

        socket.emit('helpdesk');

    });

    socket.on('newCitizen', function(data) {
        var room = data.room;
        // server emitted a custom event

        $('.requests').prepend('<div class="request" data-room="' + room + '"><h4>' + formatDate() + '</h4></div>');
        none();
    });

    socket.on('disconnect', function() {
        // socket disconnected
    });

    function none() {
        if ($('.request').length === 0) {
            $('.requests').html('<h4 class="none">None!</h4>');
        } else {
            $('.requests .none').remove();
        }
    }

    function formatDate() {
        var d = new Date();
        var hh = d.getHours();
        var m = d.getMinutes();
        var s = d.getSeconds();
        var dd = "AM";
        var h = hh;
        if (h >= 12) {
            h = hh - 12;
            dd = "PM";
        }
        if (h === 0) {
            h = 12;
        }
        m = m < 10 ? "0" + m : m;

        s = s < 10 ? "0" + s : s;

        var replacement = h + ":" + m;
        replacement += " " + dd;

        return replacement;
    }

})();