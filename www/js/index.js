var NS = {
    currentLatitude: null,
    currentLongitude: null
};

var userId = $.cookie('userId');
var userName = $.cookie('userName');
var sMessage;

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
            sMessage = response;
            if (sMessage == "OK") {
                window.location.href = "html/main.html";
            }
            else{
                window.alert(sMessage)
            }
        })
        .fail(function (error) {
            console.log(error);
        });

};

var sendLogoutInfo = function(e){
    e.preventDefault();
    localStorage.clear();

    $.ajax({
        type: 'DELETE',
        url: 'http://chataround.ddns.net:8080/user' + '?'+ $.param({username : userName})
        })
        .done( function(result) {
            window.location.href = "../index.html";
        });
};

$("[name='login']").on("click", sendLoginInfo);
$("[name='logout']").on("click", sendLogoutInfo);
$("[name='id']").on("click", showUserId);