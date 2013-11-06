define(['jquery'], function($) {
    return function(chatCallback) {
        // Set up chat
        var module = document.createElement('div');
        module.className = 'iris-chat-module';

        var topbar = document.createElement('div');
        topbar.className = 'iris-chat-top-bar';

        var left = document.createElement('div');
        left.className = 'iris-chat-left';

        var h1 = document.createElement('h1');

        h1.appendChild(document.createTextNode('Citizen Support'));

        left.appendChild(h1);
        topbar.appendChild(left);

        module.appendChild(topbar);

        var content = document.createElement('div');
        content.className = 'iris-chat-content';

        var discussion = document.createElement('ol');
        discussion.className = 'iris-chat-discussion';

        content.appendChild(discussion);

        var footer = document.createElement('div');
        footer.className = 'iris-chat-footer';

        var form = document.createElement('form');

        var input = document.createElement('input');
        input.setAttribute('type', 'text');
        form.appendChild(input);

        var submit = document.createElement('button');
        submit.setAttribute('type', 'submit');
        submit.appendChild(document.createTextNode('Send'));
        form.appendChild(submit);

        footer.appendChild(form);

        content.appendChild(footer);

        module.appendChild(content);

        document.documentElement.appendChild(module);

        var bubble = createMessageBubble('self');
        discussion.appendChild(bubble);
        createMessage(bubble, 'HIIIIIII');
        setTimeout(function() {createMessage(bubble, 'HIIIIIII');}, 60000);

        // Create message bubble
        function createMessageBubble(type) {
            var li = document.createElement('li');
            li.className = 'iris-chat-' + type;

            var messages = document.createElement('div');
            messages.className = 'iris-chat-messages';

            li.appendChild(messages);

            return li;
        }

        // Create spoken text
        function createMessage(messageBubble, text) {
            var container = messageBubble.childNodes[0];
            var $container = $(container);
            var times = $container.find('.iris-chat-time');

            var time = (times.length > 0) ? times[0] : document.createElement('span');
            time.className = 'iris-chat-time';

            while(time.firstChild) {
                time.removeChild(time.firstChild);
            }

            var date = new Date();
            time.appendChild(document.createTextNode(date.getHours() + ':' + date.getMinutes()));

            var p = document.createElement('p');
            p.appendChild(document.createTextNode(text));

            $container.children().last().remove();
            container.appendChild(p);
            container.appendChild(time);
        }

        // Set up chat trigger
        $('.iris-chat-top-bar').click(function() {
            chatCallback();
            $('.iris-chat-content').toggle();
        });
    };
});