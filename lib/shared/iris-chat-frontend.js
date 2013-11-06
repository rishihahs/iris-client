define(['jquery'], function($) {
    return function(chatCallback) {
        // Set up chat trigger
        $('.iris-chat-top-bar').click(function() {
            chatCallback();
            $('.iris-chat-content').toggle();
        });
    };
});