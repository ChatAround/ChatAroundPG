/**
 * Created by KrEtiNoS on 4/12/2015.
 */

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
var i=1;
var massage = {
    updateMessage: function(){
        var updateCurrentMessageList = function (messages) {
            var $messages = $("#chatbox");
            _.each(messages, function (message) {
                var $message = $("<div>"+ message.username + " : " + message.content + "</div>");// set_id + "--" +
                //document.getElementById("id_change").id = toString(set_id);
                $messages.append($message);
            });
        };
        messages.fetch()
            .then(updateCurrentMessageList);
}};

setInterval(function () {
    massage.updateMessage();
}, 500);

function ClearFields() {
    document.getElementById("usermsg").value = "";
}
//delete message = "<div style='display: none;'>" + message.username + " : " + message.content + "</div>"
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\\


var sendMessage = function (e) {
    e.preventDefault();

    var radius = $("[name = 'radius']").val();
    $.cookie('radius', radius);
    var sTime = $("[name = 'selectedTime']").val();
    $.cookie('sTime', sTime);

    var id = userId;
    var content = $("[name='usermsg']").val();
    var timeToSend;
    var x = document.getElementById("duration").value;
    var y = parseInt(sTime);

    if (x == 0) {
        timeToSend = y * 60;
    }else if (x == 1){
        timeToSend = y * 60 * 60;
    }else if (x == 2){
        timeToSend = y * 60 * 60 * 24;
    }else{
        timeToSend = 0;
    }

    var messageInfo ={
        id : id,
        content: content,
        radius: radius,
        duration: timeToSend
    };

    $.post("http://chataround.ddns.net:8080/message", messageInfo)
        .done(function (response) {
            window.alert("the time u choose " + timeToSend);
            ClearFields();
        })
        .fail(function (error) {
            window.alert("Message didn't send");
            console.log(error);
        });

};

$("[name='sendMes']").on("click", sendMessage);

//x=i+1;
//var $message = $("<tr>"
//        //+"<td>"+ x +"</td>"
//    +"<td>" + message.username + " : " +"</td>"
//    +"<td>"+ message.content +"</td>"
//    +"</tr>"
//);