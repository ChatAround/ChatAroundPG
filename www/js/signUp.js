var yearBox = document.getElementById('birthday_year');
for (var i = 1950; i <= 2016; i++) {
    var yearOption = document.createElement('option');
    yearOption.value = i;
    yearOption.innerHTML = i;
    yearBox.appendChild(yearOption);
}

var monthBox = document.getElementById('birthday_month');
for (var w = 1; w <= 9; w++) {
    var monthOption1 = document.createElement('option');
    monthOption1.value = "0" + w;
    monthOption1.innerHTML = "0" + w;
    monthBox.appendChild(monthOption1);
}
for (var j = 10; j <= 12; j++) {
    var monthOption = document.createElement('option');
    monthOption.value = j;
    monthOption.innerHTML = j;
    monthBox.appendChild(monthOption);
}

var dayBox = document.getElementById('birthday_day');
for (var q = 1; q <= 9; q++) {
    var dayOption1 = document.createElement('option');
    dayOption1.value = "0" + q;
    dayOption1.innerHTML = "0" + q;
    dayBox.appendChild(dayOption1);
}
for (var k = 10; k <= 31; k++) {
    var dayOption = document.createElement('option');
    dayOption.value = k;
    dayOption.innerHTML = k;
    dayBox.appendChild(dayOption);
}

var userName = $.cookie('userName');
var password = $.cookie('password');
var uMessage;
var pMessage;

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
    var birthyear = $("[name='birthday_year']");
    var birthmonth = $("[name='birthday_month']");
    var birthday_day = $("[name='birthday_day']");
    var birthday = birthyear.val() + '/' + birthmonth.val() + '/' + birthday_day.val();
    var about = $("[name='about']").val();
    var latitude = $.cookie('latitude');
    var longitude = $.cookie('longitude');
    var isOnline = true;

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
    } else if (birthyear.val() == "0") {
        document.getElementById("lbirthday").style.display = "inline";
    } else if (birthmonth.val() == "0") {
        document.getElementById("lbirthday").style.display = "inline";
    } else if (birthday_day.val() == "0") {
        document.getElementById("lbirthday").style.display = "inline";
    } else {
        $.post("http://chataround.ddns.net:8080/user", userData)
            .done(function (response) {
                    $.post("http://chataround.ddns.net:8080/userProfile", profileData)
                        .done(function (response) {
                            window.location.href = "../index.html";
                            console.log(response);
                        })
                        .fail(function (error) {
                            console.log(error);
                            switch (error.status) {
                                case 400:
                                    window.alert("You didn't gave us your location.. we can't let you in :(");
                                    break;
                                case 500:
                                    window.alert("Server Error");
                                    break;
                                case 409:
                                    window.alert("This username already in use");
                                    break;
                            }
                        });
            })
            .fail(function (error) {
                console.log(error);
                switch (error.status) {
                    case 400:
                        window.alert("You didn't gave us your location.. we can't let you in :(");
                        break;
                    case 500:
                        window.alert("Server Error");
                        break;
                    case 409:
                        window.alert("This username already in use");
                        break;
                }
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
function hideBDLabel() {
    document.getElementById("lbirthday").style.display = "none";
}



$("[name='first_name']").on("click", hideFNLabel);
$("[name='last_name']").on("click", hideLNLabel);
$("[name='username']").on("click", hideUNLabel);
$("[name='password']").on("click", hidePLabel);
$("[name='confirm_pass']").on("click", hidePCLabel);
$("[name='birthday_year']").on("click", hideBDLabel);
$("[name='birthday_month']").on("click", hideBDLabel);
$("[name='birthday_day']").on("click", hideBDLabel);

$("[name='register']").on("click", sendRegisterInfo);