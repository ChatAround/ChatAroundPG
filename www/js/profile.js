/**
 * Created by Stratos on 25/12/2015.
 */

var userName = $.cookie('userName');

var userProfileModel = Backbone.Model.extend({
    defaults: {
        "firstname": "",
        "lastname": "",
        "username": "",
        "country": "",
        "city": "",
        "age": "",
        "birthday": "",
        "gender": ""
    }
});

var userProfileCollection = Backbone.Collection.extend({
    url: 'http://chataround.ddns.net:8080/userProfile' + '?' + $.param({username: userName}),
    model: userProfileModel
});

var getProfile = function(UserProfile) {
    document.getElementById("firstname").value = UserProfile.firstname;
    document.getElementById("lastname").value = UserProfile.lastname;
    document.getElementById("prof_user").value = UserProfile.username;
    document.getElementById("country").value = UserProfile.country;
    document.getElementById("city").value = UserProfile.city;
    document.getElementById("age").value = UserProfile.age;
    document.getElementById("birthday").value = UserProfile.birthday;
    document.getElementById("gender").value = UserProfile.gender;
};

var updateProfile = function() {
    var firstname = document.getElementById("firstname").val();
    var lastname = document.getElementById("lastname").val();
    var country = document.getElementById("country").val();
    var city = document.getElementById("city").val();
    var age = document.getElementById("age").val();
    var birthday = document.getElementById("birthday").val();
    var gender = document.getElementById("gender").val();

    $.ajax({
        type: 'PUT',
        url: 'http:/chataround.ddns.net:8080/userProfile' + '?' + $.param({firstName: firstname, lastName: lastname, username: userName, country: country, city: city, age: age, birthday: birthday, gender: gender})
    })
        .done(function(result) {
            window.alert("Changes saved!")
        })
};


window.onload = function() {

    //popup
    document.getElementById("settingsBtn").onclick = function(){
        var overlay = document.getElementById("overlay");
        var popup = document.getElementById("popup");
        overlay.style.display = "block";
        popup.style.display = "block";
    };

    document.getElementById("closeBtn").onclick = function() {
        document.getElementById("overlay").style.display = "none";
        document.getElementById("popup").style.display = "none";
    };

    document.getElementById("radius").onchange = function() {
        var newRadius = document.getElementById("radius").value;
        if (window.confirm("Save radius?")) {
            document.getElementById("radius").defaultValue = newRadius;
            radiusChange();
        } else {
            document.getElementById("radius").value = document.getElementById("radius").defaultValue;
        }
    };

    document.getElementById("selectedTime").onchange = function() {
        var newTime = document.getElementById("selectedTime").value;
        if (window.confirm("Save time?")) {
            document.getElementById("selectedTime").defaultValue = newTime;
        } else {
            document.getElementById("selectedTime").value = document.getElementById("selectedTime").defaultValue;
        }
    };
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//edit profile

    document.getElementById("editFN").onclick = function() {
        document.getElementById('firstname').disabled = false;
        document.getElementById('firstname').style.border = '1px solid blue';
        document.getElementById("firstname").focus();
    };
    document.getElementById("firstname").onblur = function() {
        var newFN = document.getElementById("firstname").value;
        if (newFN != document.getElementById("firstname").defaultValue) {
            if (window.confirm("Change first name?")) {
                document.getElementById("firstname").defaultValue = newFN;
                document.getElementById("firstname").style.border = 'none';
                document.getElementById("firstname").disabled = true;
            } else {
                document.getElementById("firstname").value = document.getElementById("firstname").defaultValue;
                document.getElementById("firstname").style.border = 'none';
                document.getElementById("firstname").disabled = true;
            }
        } else {
            document.getElementById("firstname").style.border = 'none';
            document.getElementById("firstname").disabled = true;
        }
    };

    document.getElementById("editLN").onclick = function() {
        document.getElementById('lastname').disabled = false;
        document.getElementById('lastname').style.border = '1px solid blue';
        document.getElementById('lastname').focus();
    };
    document.getElementById("lastname").onblur = function() {
        var newLN = document.getElementById("lastname").value;
        if (newLN != document.getElementById("lastname").defaultValue) {
            if (window.confirm("Save last name?")) {
                document.getElementById("lastname").defaultValue = newLN;
                document.getElementById("lastname").style.border = 'none';
                document.getElementById("lastname").disabled = true;
            } else {
                document.getElementById("lastname").value = document.getElementById("lastname").defaultValue;
                document.getElementById("lastname").style.border = 'none';
                document.getElementById("lastname").disabled = true;
            }
        }else {
            document.getElementById("lastname").style.border = 'none';
            document.getElementById("lastname").disabled = true;
        }
    };

    document.getElementById("editCo").onclick = function() {
        document.getElementById("country").disabled = false;
        document.getElementById("country").style.border = '1px solid blue';
        document.getElementById("country").focus();
    };
    document.getElementById("country").onblur = function() {
        var newC = document.getElementById("country").value;
        if (newC != document.getElementById("country").defaultValue) {
            if (window.confirm("Save country?")) {
                document.getElementById("country").defaultValue = newC;
                document.getElementById("country").style.border = 'none';
                document.getElementById("country").disabled = true;
            } else {
                document.getElementById("country").value = document.getElementById("country").defaultValue;
                document.getElementById("country").style.border = 'none';
                document.getElementById("country").disabled = true;
            }
        } else {
            document.getElementById("country").style.border = 'none';
            document.getElementById("country").disabled = true;
        }
    };

    document.getElementById("editCi").onclick = function() {
        document.getElementById("city").disabled = false;
        document.getElementById("city").style.border = '1px solid blue';
        document.getElementById("city").focus();
    };
    document.getElementById("city").onblur = function() {
        var newC = document.getElementById("city").value;
        if (newC != document.getElementById("city").defaultValue) {
            if (window.confirm("Save city?")) {
                document.getElementById("city").defaultValue = newC;
                document.getElementById("city").style.border = 'none';
                document.getElementById("city").disabled = true;
            } else {
                document.getElementById("city").value = document.getElementById("country").defaultValue;
                document.getElementById("city").style.border = 'none';
                document.getElementById("city").disabled = true;
            }
        } else {
            document.getElementById("city").style.border = 'none';
            document.getElementById("city").disabled = true;
        }
    };


    document.getElementById("editA").onclick = function() {
        document.getElementById('age').disabled = false;
        document.getElementById('age').style.border = '1px solid blue';
        document.getElementById("age").focus();
    };
    document.getElementById("age").onblur = function() {
        var newA = document.getElementById("age").value;
        if (newA != document.getElementById("age").defaultValue) {
            if (window.confirm("Save age?")) {
                document.getElementById("age").defaultValue = newA;
                document.getElementById("age").style.border = 'none';
                document.getElementById("age").disabled = true;
            } else {
                document.getElementById("age").value = document.getElementById("age").defaultValue;
                document.getElementById("age").style.border = 'none';
                document.getElementById("age").disabled = true;
            }
        } else {
            document.getElementById("age").style.border = 'none';
            document.getElementById("age").disabled = true;
        }
    };

    document.getElementById("editB").onclick = function() {
        document.getElementById('birthday').disabled = false;
        document.getElementById('birthday').style.border = '1px solid blue';
        document.getElementById('birthday').focus();
    };
    document.getElementById('birthday').onblur = function() {
        var newB = document.getElementById('birthday').value;
        if (newB != document.getElementById('birthday').defaultValue) {
            if (window.confirm("Save birthday?")) {
                document.getElementById('birthday').defaultValue = newB;
                document.getElementById('birthday').style.border = 'none';
                document.getElementById('birthday').disabled = true;
            } else {
                document.getElementById('birthday').value = document.getElementById('birthday').defaultValue;
                document.getElementById('birthday').style.border = 'none';
                document.getElementById('birthday').disabled = true;
            }
        } else {
            document.getElementById('birthday').style.border = 'none';
            document.getElementById('birthday').disabled = true;
        }
    };

    document.getElementById("editG").onclick = function() {
        document.getElementById('gender').disabled = false;
        document.getElementById('gender').style.border = '1px solid blue';
        document.getElementById('gender').focus();
    };
    document.getElementById('gender').onblur = function() {
        var newG = document.getElementById('gender').value;
        if (newG != document.getElementById('gender').defaultValue) {
            if (window.confirm("Save gender?")) {
                document.getElementById('gender').defaultValue = newG;
                document.getElementById('gender').style.border = 'none';
                document.getElementById('gender').disabled = true;
            } else {
                document.getElementById('gender').value = document.getElementById('gender').defaultValue;
                document.getElementById('gender').style.border = 'none';
                document.getElementById('gender').disabled = true;
            }
        } else {
            document.getElementById('gender').style.border = 'none';
            document.getElementById('gender').disabled = true;
        }
    }
};

$("[name='users']").on("click", getProfile);
$("[name='saveProfile']").on('click', updateProfile);