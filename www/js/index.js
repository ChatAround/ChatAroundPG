var NS = {
    currentLatitude: null,
    currentLongitude: null
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

    //var id = "1";
    var username = $("[name='username']").val();
    //var password = $("[name='password']")).val();
    var latitude = NS.currentLatitude;
    var longitude = NS.currentLongitude;

    var data = {
        username: username,
        latitude: latitude,
        longitude: longitude
    };

    $.post("http://chataround.ddns.net:8080/login", data)
        .done(function (response) {
            window.location.href = "html/main.html";
        })
        .fail(function (error) {
            //window.location.href = "html/main.html";
            console.log(error);
        });
};

$("[name='login']").on("click", sendLoginInfo);

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
