var x = document.getElementById("location");


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition,showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {

    var lat,long;

    lat = position.coords.latitude;
    long = position.coords.longitude;

    x.innerHTML = "Latitude: " + lat + "<br>Longitude: " + long;
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out.";
            break;
    }
}

//socket

function setConnected(connected) {
    document.getElementById('connect').disabled = connected;
    document.getElementById('disconnect').disabled = !connected;
}
var socket = new SockJS('http://test.pusher.com/'); //http://chataround.ddns.net:8080/login
var stompClient = Stomp.over(socket);

function connect() {
    stompClient.connect({}, function(frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/chat', function(LoginMsg){
            showLoginMesssage(JSON.parse(LoginMsg.body).content);
        });
    });
}

function showLoginMesssage(message) {
    var response = document.getElementById('response');
    var p = document.createElement('p');
    p.style.wordWrap = 'break-word';
    p.appendChild(document.createTextNode(message));
    response.appendChild(p);
}
function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendLogin(){

    var username = $('#username').val();
    //var password = $('#password').val();
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var id = "1L";

    var userInfo = {
        id: id,
        username: username,
        //password: password,
        latitude: latitude,
        longitude: longitude
    };

    socket.send(JSON.stringify(userInfo));
}