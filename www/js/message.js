/**
 * Created by KrEtiNoS on 4/12/2015.
 */

//var userId = $.cookie('userId');
//var userName = $.cookie('userName');
//
//var MessageModel = Backbone.Model.extend({
//    defaults: {
//        "username": "",
//        "content": ""
//    }
//});
//var MessageCollection = Backbone.Collection.extend({
//    url: 'http://chataround.ddns.net:8080/message' + '?'+ $.param({id : userId}),
//    model: MessageModel
//});
//
//var messages = new MessageCollection();
//var i=1;
//var massage = {
//    updateMessage: function(){
//        var updateCurrentMessageList = function (messages) {
//            var $messages = $("#chatbox");
//            _.each(messages, function (message) {
//                var $message = $("<div>"+ message.username + " : " + message.content + "</div>");// set_id + "--" +
//                //document.getElementById("id_change").id = toString(set_id);
//                $messages.append($message);
//            });
//        };
//        messages.fetch()
//            .then(updateCurrentMessageList);
//}};
//
//setInterval(function () {
//    massage.updateMessage();
//}, 500);

var userId = $.cookie('userId');
var userName = $.cookie('userName');

var MessageModel = Backbone.Model.extend({
    defaults: function(){
        return {
            "id": "",
            "username": "",
            "content": ""
        }
    }
});
var x=0;
//lambanei
var IncomingMessageCollection = Backbone.Collection.extend({
    url: 'http://chataround.ddns.net:8080/message' + '?'+ $.param({id : userId}),
    model: MessageModel

});

    //_.each(IncomingMessageCollection, function (MessageModel) {
    //for ( var i = 0, len = IncomingMessageCollection.localStorage.length; i < len; ++i ) {
    //    var msgID = IncomingMessageCollection.localStorage.getItem(IncomingMessageCollection.localStorage.id( i ));
    //    if (msgID != MessageModel.id)
        // MessageModel.save();
        // document.getElementById("result").innerHTML = localStorage.getItem(MessageModel.content);
    //    }
    //});

var messages = new IncomingMessageCollection();
var massage = {
    updateMessage: function(){
        var updateLocalMessageList = function (messages) {
            _.each(messages, function (message) {
                var isHere = 0;
                for ( x; x < localStorage.length; x++) {
                    //var k = "messages"+x;
                    var db = localStorage.getItem(messages+x);
                    //if (db.id === null){break;}
                    if (message.id == db.id){
                        isHere=1;
                    }
                }
                if (isHere == 0) {
                    //localStorage.setItem("messages"+x, message.id + message.username + message.content);
                    messages.fetch();
                    messages.add(message);
                    message.save();
                }
            });
        };
        messages.fetch()
            .then(updateLocalMessageList);
    }};
if (typeof(Storage) !== "undefined") {
    // Retrieve
    document.getElementById("result").innerHTML = localStorage.getItem(messages+x);
} else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
}
//tupwnei
var MessageCollection = Backbone.Collection.extend({
    model: MessageModel,
    localStorage: new Backbone.LocalStorage("messages"+x)
});

var showMessages = new MessageCollection();
var showMessage = {
    updateMessage: function(){
        var updateCurrentMessageList = function (showMessage) {
            var $showMessages = $("#chatbox");
            _.each(showMessage, function (messages) {

                var $showMessage = $("<div>"+ localStorage.getItem(messages+x) + " : " + localStorage.getItem(messages.content) + "</div>");
                $showMessages.append($showMessage);
            });
        };
        showMessages.fetch()
            .then(updateCurrentMessageList);
    }};

MessageCollection.localStorage = new Backbone.LocalStorage("ShowMessage");
//IncomingMessageCollection.fetch();
//console.log(MessageCollection.pluck('id'));//emfanisi

function ClearFields() {
    document.getElementById("usermsg").value = "";
}

setInterval(function () {
    massage.updateMessage();
}, 500);
setInterval(function () {
    showMessage.updateMessage();
}, 500);
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
    document.getElementById("result").innerHTML = localStorage.getItem("messages");

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