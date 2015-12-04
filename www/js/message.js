/**
 * Created by KrEtiNoS on 4/12/2015.
 */

var stompClient = null;

function setConnected(connected) {
    document.getElementById('connect').disabled = connected;
    document.getElementById('disconnect').disabled = !connected;
    document.getElementById('conversationDiv').style.visibility = connected ? 'visible' : 'hidden';
    document.getElementById('response').innerHTML = '';
}

function connect() {
    var socket = new SockJS('http://chataround.ddns.net:8080/message');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('http://chataround.ddns.net:8080/topic/chat', function(message){
            showMessage(JSON.parse(message.body));
        });
    });
}

function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
    window.alert("Disconnected");
}

function sendMessage() {
    //var id = $.cookie('userId');
    //var username = $.cookie('userName');
    var message = $("[name='usermsg']").val() ;
    stompClient.send("http://chataround.ddns.net:8080/app/message",{}, JSON.stringify({ message : message }));
}

function showMessage(message) {
    var response = document.getElementById('mpla');
    var p = document.createElement('p');
    //var mes = document.createTextNode(message);
    p.appendChild(document.createTextNode(message));
    response.appendChild(p);
    //document.getElementById("chatbox").appendChild(message);
    //response.appendChild(mes);

}

$("[name='sendMes']").on("click", sendMessage);