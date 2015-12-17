var userId = $.cookie('userId');
var userName = $.cookie('userName');

var MessageModel = Backbone.Model.extend({
    defaults: {
        "username": "",
        "content": ""
    }
});
var MessageCollection = Backbone.Collection.extend({
    url: 'http://chataround.ddns.net:8080/message' + '?'+ $.param({id : userId}),
    model: MessageModel
});

var messages = new MessageCollection();
var massage = {
    updateMessage: function(){
        var updateCurrentMessageList = function (messages) {
            var $messages = $("#chatbox1");
            var lenght=$('div#wrapper div#chatbox ul#chatbox1 li').length;
            var isHere = 0;
            var ul = document.getElementById("chatbox1");
            var elementsLI = ul.getElementsByTagName("li");
            _.each(messages, function (message) {

                //$('ul li').each(function(i){$(this).attr('id');}); var dis = $('div#wrapper div#chatbox ul#chatbox1 li').attr('id');

                    //for (var x = 0; x < lenght; x++) {
                    //    $('div#wrapper div#chatbox ul#chatbox1 li')
                    //        .each(function(i){
                    //            if (message.id == $(this).attr('id')) {
                    //                isHere = 1;
                    //                break;
                    //            }
                    //        });
                    //}
                    //mpla=1;
                //tupwnei apoira
                    //for (var x = 0; x < lenght; x++) {
                    //    var dis;
                    //    _.each($('div#wrapper div#chatbox ul#chatbox1 li'), function (li) {
                    //        dis = $(this).id;
                    //        if (message.id == dis) {
                    //            isHere = 1;
                    //        }
                    //        if (isHere == 0) {
                    //            //var $message = $("<li id='" + message.id + "' >" + message.username + " : " + message.content + "</li>");
                    //            var $message = $("<li id='" + message.id + "' >" + message.username + " : " + message.content +" "+ lenght+ " " + dis +" "+ message.id +" " + isHere + "</li>");
                    //            $messages.append($message);
                    //        }
                    //    });
                    //    //var dis = $('div#wrapper div#chatbox ul#chatbox1 li').attr('id');
                    //}

                for (var x = 0; x < elementsLI.length; ++x) {
                        var dis = elementsLI[x].id;
                        if (message.id == dis) {
                            isHere = 1;
                            break;
                        }
                }
                if (isHere == 0) {
                    //var $message = $("<li id='" + message.id + "' >" + message.username + " : " + message.content + "</li>");
                    var $message = $("<li id='" + message.id + "' >" + message.username + " : " + message.content +" "+ lenght+ " " + dis +" "+ message.id +" " + isHere + "</li>");
                    $messages.append($message);
                }


                    //var dis = $('div#wrapper div#chatbox ul#chatbox1 li').attr('id');

                //if (isHere == 0) {
                //    //var $message = $("<li id='" + message.id + "' >" + message.username + " : " + message.content + "</li>");
                //    var diss= $.cookie('dis');
                //    var $message = $("<li id='" + message.id + "' >" + message.username + " : " + message.content +" "+ lenght+ " " + diss +" "+ message.id +" " + isHere + "</li>");
                //    $messages.append($message);
                //}
            });
        };
        messages.fetch()
            .then(updateCurrentMessageList);
    }};

setInterval(function () {
    massage.updateMessage();
}, 500);