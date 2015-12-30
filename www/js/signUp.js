/**
    * @author Stratos
    */

var NS = {
    currentLatitude: null,
    currentLongitude: null
};
var userName = $.cookie('userName');
var password = $.cookie('password');
var uMessage;
var pMessage;

var Location = {
    updateLocation: function () {
        var updateCurrentLocation = function (position) {
            NS.currentLatitude = position.coords.latitude;
            NS.currentLongitude = position.coords.longitude;
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

var sendRegisterInfo = function(e) {
    e.preventDefault();


    var firstName = $("[name='first_name']").val();
    var lastName = $("[name='last_name']").val();
    var username = $("[name='username']").val();
    var password = $("[name='password']").val();
    var confirmPass = $("[name='confirm_pass']").val();
    var gender = $("[name='gender']").val();
    var country = $("[name='country']").val();
    var city = $("[name='city']").val();
    var birthyear = $("[name='birthday_year']").val();
    var birthmonth = $("[name='birthday_month']").val();
    var birthday_day = $("[name='birthday_day']").val();
    var birthday = birthyear + '/' + birthmonth + '/' + birthday_day;
    var about = $("[name='about']").val();
    var latitude = NS.currentLatitude;
    var longitude = NS.currentLongitude;
    var isOnline = true;
    $.cookie('userName', username);
    $.cookie('password', password);

    var userData = {
        username: username,
        password: password,
        latitude: latitude,
        longitude: longitude,
        isOnline: isOnline
    };

    var profileData = {
        username: username,
        firstName: firstName,
        surName: lastName,
        gender: gender,
        country: country,
        city: city,
        birthday: birthday,
        about: about
    };

    if (firstName == "") {
        document.getElementById("lfirst_name").style.display = "inline";
    } else if (lastName == "") {
        document.getElementById("llast_name").style.display = "inline";
    } else if (username == "") {
        document.getElementById("lusername").style.display = "inline";
    } else if (password == "" || confirmPass == "") {
        document.getElementById("lpassword").style.display = "inline";
        document.suform.password.value = "";
        document.suform.confirm_pass.value = "";
    } else if (password != confirmPass) {
        document.getElementById("lconfirm_pass").style.display = "inline";
        document.suform.confirm_pass.value = "";
    } else if (birthyear == "" || birthyear < 1950 || birthyear > 2050) {
        document.getElementById("lbirthday_year").style.display = "inline";
    } else if (birthmonth == "" || birthmonth < 01 || birthmonth > 12) {
        document.getElementById("lbirthday_month").style.display = "inline";
    } else if (birthday_day == "" || birthday_day < 01 || birthday_day > 31) {
        document.getElementById("lbirthday_day").style.display = "inline";
    } else {
        $.post("http://chataround.ddns.net:8080/user", userData)
            .done(function (response) {
                uMessage = response;
                if (uMessage == "OK") {
                    $.post("http://chataround.ddns.net:8080/userProfile", profileData)
                        .done(function (response) {
                            pMessage = response;
                            if (pMessage == "OK") {
                                window.location.href = "main.html";
                            } else {
                                window.alert(pMessage)
                            }
                        })
                        .fail(function (error) {
                            console.log(error);
                        });
                } else {
                    window.alert(uMessage)
                }
            })
            .fail(function (error) {
                console.log(error);
            });
    }


};

function hideFNLabel() {
    document.getElementById("lfirst_name").style.display = "none";
}
function hideLNLabel() {
    document.getElementById("llast_name").style.display = "none";
}
function hideUNLabel() {
    document.getElementById("lusername").style.display = "none";
}
function hidePLabel() {
    document.getElementById("lpassword").style.display = "none";
}
function hidePCLabel() {
    document.getElementById("lconfirm_pass").style.display = "none";
}
function hideELabel() {
    document.getElementById("lemail").style.display = "none";
}
function hideBDYLabel() {
    document.getElementById("lbirthday_year").style.display = "none";
}
function hideBDMLabel() {
    document.getElementById("lbirthday_month").style.display = "none";
}
function hideBDDLabel() {
    document.getElementById("lbirthday_day").style.display = "none";
}


$("[name='first_name']").on("click", hideFNLabel);
$("[name='last_name']").on("click", hideLNLabel);
$("[name='username']").on("click", hideUNLabel);
$("[name='password']").on("click", hidePLabel);
$("[name='confirm_pass']").on("click", hidePCLabel);
$("[name='birthday_year']").on("click", hideBDYLabel);
$("[name='birthday_month']").on("click", hideBDMLabel);
$("[name='birthday_day']").on("click", hideBDDLabel);

$("[name='register']").on("click", sendRegisterInfo);