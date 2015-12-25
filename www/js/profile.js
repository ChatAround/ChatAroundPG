/**
 * Created by Stratos on 25/12/2015.
 */
var userName = $.cookie('userName');

    //get and update profile values

    var userProfileModel = Backbone.Model.extend({
        defaults: {
            "username": "",
            "firstName": "",
            "surName": "",
            "gender": "",
            "country": "",
            "city": "",
            "birthday": "",
            "about":" "
        }
    });

    var userProfileCollection = Backbone.Collection.extend({
        url: 'http://localhost:8080/userProfile' + '?' + $.param({username: userName}),
        model: userProfileModel
    });

    var UserProfile = new userProfileCollection();

    var getProfile = function(UserProfile) {
        $('#prof_user').val(UserProfile.username);
        $('#firstname').val(UserProfile.firstName);
        $('#lastname').val(UserProfile.surName);
        $('#gender').val(UserProfile.gender);
        $('#country').val(UserProfile.country);
        $('#city').val(UserProfile.city);
        $('#birthday').val(UserProfile.birthday);
        $('#about').val(UserProfile.about);
    };

    UserProfile.fetch()
        .then(getProfile);

    var updateProfile = function() {
        var username = document.getElementById("prof_user").value;
        var firstname = document.getElementById("firstname").value;
        var lastname = document.getElementById("lastname").value;
        var country = document.getElementById("country").value;
        var city = document.getElementById("city").value;
        var birthday = document.getElementById("birthday").value;
        var gender = document.getElementById("gender").value;
        var about = document.getElementById("about".value);

        $.ajax({
                type: 'PUT',
                url: 'http:/localhost:8080/userProfile' + '?' + $.param({username: username,firstName: firstname, lastName: lastname,  gender: gender, country: country, city: city,birthday: birthday,about:about})
            })
            .done(function(result) {
                window.alert("Changes saved!")
            })
    };


//edit profile
window.onload = function() {
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
    };

    document.getElementById("editAbout").onclick = function() {
        document.getElementById('about').disabled = false;
        document.getElementById('about').style.border = '1px solid blue';
        document.getElementById('about').focus();
    };
    document.getElementById('about').onblur = function() {
        var newG = document.getElementById('about').value;
        if (newG != document.getElementById('about').defaultValue) {
            if (window.confirm("Save informations?")) {
                document.getElementById('about').defaultValue = newG;
                document.getElementById('about').style.border = 'none';
                document.getElementById('about').disabled = true;
            } else {
                document.getElementById('about').value = document.getElementById('about').defaultValue;
                document.getElementById('about').style.border = 'none';
                document.getElementById('about').disabled = true;
            }
        } else {
            document.getElementById('gender').style.border = 'none';
            document.getElementById('gender').disabled = true;
        }
    };
};

$("[name='users']").on("click", getProfile);
$("[name='saveProfile']").on('click', updateProfile);