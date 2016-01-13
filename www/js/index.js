var NS = {
    currentLatitude: null,
    currentLongitude: null
};

var userName = $.cookie('userName');
var password = $.cookie('password');

var showUserName = function(){
    $("#userName").html(userName)
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
            $.cookie('latitude', NS.currentLatitude);
            $.cookie('longitude', NS.currentLongitude);
            showUserName();
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

var sendLoginInfo = function(e) {
    e.preventDefault();

    var username = $("[name='username']").val();
    var password = $("[name='password']").val();
    var latitude = $.cookie('latitude');
    var longitude = $.cookie('longitude');
    var isOnline = true;
    $.cookie('userName', username);
    $.cookie('password', password);
    $.cookie('isOnline', isOnline);

    $.ajax({
            type: 'PUT',
            url: 'http://chataround.ddns.net:8080/user' + '?' + $.param({
                username: username,
                password: password,
                latitude: latitude,
                longitude: longitude,
                isOnline: isOnline
            })
        })
        .done(function(result) {
                window.location.href = "html/main.html";
        })
        .fail(function(error) {
            console.log(error);
            switch (error.status) {
                case 400:
                    window.alert("You didn't gave us your location.. we can't let you in :(");
                    break;
                case 401:
                    window.alert("Wrong password :(");
                    break;
                case 404:
                    window.alert("There is no such username :(");
                    break;
            }
        });
};

var sendLogoutInfo = function(e) {
    e.preventDefault();

    var latitude = $.cookie('latitude');
    var longitude = $.cookie('longitude');
    var isOnline = false;
    $.cookie('isOnline', isOnline);

    $.ajax({
            type: 'PUT',
            url: 'http://chataround.ddns.net:8080/user' + '?' + $.param({
                username: userName,
                password: password,
                latitude: latitude,
                longitude: longitude,
                isOnline: isOnline
            })
        })
        .done(function(result) {
            localStorage.clear();
            window.location.href = "../index.html"
        })

};

$("[name='login']").on("click", sendLoginInfo);
$("[name='logout']").on("click", sendLogoutInfo);

function enterKey (e) {
    if (13 === e.keyCode) {
        sendLoginInfo(e);
    }
}