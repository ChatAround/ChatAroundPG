var NS = {
    currentLatitude: null,
    currentLongitude: null
};

var userId = $.cookie('userId');
var userName = $.cookie('userName');

var showUserName = function(){
    $("#userName").html(userName)
};

var showUserId = function (){
    $("#userid").html(userId);
};
var showLocation = function () {
    $("#latitude").html(NS.currentLatitude);
    $("#longitude").html(NS.currentLongitude);
};

var Location = {
    updateLocation: function () {
        var updateCurrentLocation = function (position) {
            NS.currentLatitude = position.coords.latitude;
            NS.currentLongitude = position.coords.longitude;
            showUserName();
            showUserId();
            showLocation();
        };

        var throwError = function (error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    throw new Error("User denied the request for Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    throw new Error("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    throw new Error("The request to get user location timed out.");
                    break;
            }
        };

        navigator.geolocation.getCurrentPosition(updateCurrentLocation, throwError);
    }
};

setInterval(function () {
    Location.updateLocation();
}, 500);

var sendLoginInfo = function (e) {
    e.preventDefault();

    //var id = "1L";
    var username = $("[name='username']").val();
    //var password = $("[name='password']")).val();
    var latitude = NS.currentLatitude;
    var longitude = NS.currentLongitude;
    $.cookie('userName', username);

    var data = {
        username: username,
        latitude: latitude,
        longitude: longitude
    };

    $.post("http://chataround.ddns.net:8080/user", data)
        .done(function (response) {
            userId = response;
            $.cookie('userId', userId);
            window.location.href = "html/main.html";
        })
        .fail(function (error) {
            console.log(error);
        });

};

var sendLogoutInfo = function(e){
    e.preventDefault();

    $.ajax({
        type: 'DELETE',
        url: 'http://chataround.ddns.net:8080/user' + '?'+ $.param({id : userId})
        })
        .done( function(result) {
            window.location.href = "../index.html";
        });
};

$("[name='login']").on("click", sendLoginInfo);
$("[name='logout']").on("click", sendLogoutInfo);
$("[name='id']").on("click", showUserId);

// Sockets

//function setConnected(connected) {
//    document.getElementById('connect').disabled = connected;
//    document.getElementById('disconnect').disabled = !connected;
//}
//
//var socket = new SockJS('http://test.pusher.com/'); //http://chataround.ddns.net:8080/login
//var stompClient = Stomp.over(socket);
//
//function connect() {
//    stompClient.connect({}, function (frame) {
//        setConnected(true);
//        console.log('Connected: ' + frame);
//        stompClient.subscribe('/topic/chat', function (LoginMsg) {
//            showLoginMesssage(JSON.parse(LoginMsg.body).content);
//        });
//    });
//}
//
//function showLoginMesssage(message) {
//    var response = document.getElementById('response');
//    var p = document.createElement('p');
//    p.style.wordWrap = 'break-word';
//    p.appendChild(document.createTextNode(message));
//    response.appendChild(p);
//}
//function disconnect() {
//    if (stompClient != null) {
//        stompClient.disconnect();
//    }
//    setConnected(false);
//    console.log("Disconnected");
//}

//function sendLogin(){
//
//    var username = $('#username').val();
//    //var password = $('#password').val();
//    var latitude = position.coords.latitude;
//    var longitude = position.coords.longitude;
//    var id = "1L";
//
//    var userInfo = {
//        id: id,
//        username: username,
//        //password: password,
//        latitude: latitude,
//        longitude: longitude
//    };
//
//    socket.send(JSON.stringify(userInfo));
//}