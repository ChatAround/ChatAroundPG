var userId = $.cookie('userId');
var userName = $.cookie('userName');

var MessageModel = Backbone.Model.extend({
    defaults: {
        "username": "",
        "content": ""
    }
});

var MessageCollection = Backbone.Collection.extend({
    url: 'http://chataround.ddns.net:8080/message' + '?'+ $.param({username : userName}),
    model: MessageModel
});

var massage = {
    updateMessage: function(){
        var messages = new MessageCollection();
        var updateCurrentMessageList = function (messages) {
            var $messages = $("#chatbox1");
            var ul = document.getElementById("chatbox1");
            var elementsLI = ul.getElementsByTagName("li");

            _.each(messages, function (message) {
                var isHere = 0;
                for (var x = 0; x < elementsLI.length; ++x) {
                    var dis = elementsLI[x].id;
                    if (message.id == dis) {
                        isHere = 1;
                        break;
                    }
                }
                if (isHere == 0) {
                    var $message = $("<li id='" + message.id + "' >" + message.username + " : " + message.content + "</li>");
                    $messages.append($message);
                }
            });

            for (var x = 0; x < elementsLI.length; ++x) {
                var dis = elementsLI[x].id;
                var deleted = 0;
                _.each(messages, function (message) {
                    if ( dis == message.id) {
                        deleted = 1;
                    }
                });
                if (deleted == 0) {
                    document.getElementById(dis).style.display = "none";
                    //$(dat).remove(); done alla anabwsbinei
                    //document.getElementById(dis).style.visibility = "hidden"; // done alla opws eipa dessmeuei tn xwro
                }
            }

        };
        messages.fetch()
            .then(updateCurrentMessageList);
    }};

setInterval(function () {
    massage.updateMessage();
}, 500);