/**
 * Created by KrEtiNoS on 4/12/2015.
 */

var sendMessage = function (e) {
    e.preventDefault();

    var radius = $("[name = 'radius']").val();
    $.cookie('radius', radius);
    var sTime = $("[name = 'selectedTime']").val();
    $.cookie('sTime', sTime);

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
        username : userName,
        content: content,
        radius: radius,
        duration: timeToSend
    };

    $.post("http://chataround.ddns.net:8080/message", messageInfo)
        .done(function (response) {
            ClearFields();
        })
        .fail(function (error) {
            window.alert("Message didn't send");
            console.log(error);
        });

};

function ClearFields() {
    document.getElementById("usermsg").value = "";
}

$("[name='sendMes']").on("click", sendMessage);

function sendMess (e) {
    if (13 === e.keyCode) {
        sendMessage(e);
    }
}