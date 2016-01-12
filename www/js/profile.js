/**
    * @author Stratos
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
            "about": ""
        }
    });

    var userProfileCollection = Backbone.Collection.extend({
        url: 'http://chataround.ddns.net:8080/userProfile' + '?' + $.param({username: userName}),
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
        var about = document.getElementById("about").value;
        var birth = birthday.replace(/-/g, "/");

        $.ajax({
                type: 'PUT',
                url: 'http://chataround.ddns.net:8080/userProfile' + '?' + $.param({username: userName,firstName: firstname, surName: lastname, gender: gender, country: country, city: city, birthday: birth, about:about})
            })
            .done(function(result) {
                window.alert("Changes saved!")
            })
    };


//edit profile
window.onload = function() {
    document.getElementById("editCo").onclick = function() {
        document.getElementById("country").disabled = false;
        document.getElementById("country").style.background = 'white';
        document.getElementById("country").style.border = '1px solid #32174d';
        document.getElementById("country").focus();
    };
    document.getElementById("country").onblur = function() {
        var newCo = document.getElementById("country").value;
        if (newCo != document.getElementById("country").defaultValue) {
            if (window.confirm("Save country?")) {
                document.getElementById("country").defaultValue = newCo;
                document.getElementById("country").style.border = 'none';
                document.getElementById("country").disabled = true;
                document.getElementById("country").style.background = 'rgba(50, 23, 77, 0)';
                document.getElementById("saveProfile").style.display = 'block';
            } else {
                document.getElementById("country").value = document.getElementById("country").defaultValue;
                document.getElementById("country").style.border = 'none';
                document.getElementById("country").disabled = true;
                document.getElementById("country").style.background = 'rgba(50, 23, 77, 0)';
            }
        } else {
            document.getElementById("country").style.border = 'none';
            document.getElementById("country").disabled = true;
            document.getElementById("country").style.background = 'rgba(50, 23, 77, 0)';
        }
    };

    document.getElementById("editCi").onclick = function() {
        document.getElementById("city").disabled = false;
        document.getElementById("city").style.background = 'white';
        document.getElementById("city").style.border = '1px solid #32174d';
        document.getElementById("city").focus();
    };
    document.getElementById("city").onblur = function() {
        var newCi = document.getElementById("city").value;
        if (newCi != document.getElementById("city").defaultValue) {
            if (window.confirm("Save city?")) {
                document.getElementById("city").defaultValue = newCi;
                document.getElementById("city").style.border = 'none';
                document.getElementById("city").disabled = true;
                document.getElementById("city").style.background = 'rgba(50, 23, 77, 0)';
                document.getElementById("saveProfile").style.display = 'block';
            } else {
                document.getElementById("city").value = document.getElementById("city").defaultValue;
                document.getElementById("city").style.border = 'none';
                document.getElementById("city").disabled = true;
                document.getElementById("city").style.background = 'rgba(50, 23, 77, 0)';
            }
        } else {
            document.getElementById("city").style.border = 'none';
            document.getElementById("city").disabled = true;
            document.getElementById("city").style.background = 'rgba(50, 23, 77, 0)';
        }
    };

    document.getElementById("editAbout").onclick = function() {
        document.getElementById('about').disabled = false;
        document.getElementById("about").style.background = 'white';
        document.getElementById('about').style.border = '1px solid #32174d';
        document.getElementById('about').focus();
    };
    document.getElementById('about').onblur = function() {
        var newG = document.getElementById('about').value;
        if (newG != document.getElementById('about').defaultValue) {
            if (window.confirm("Save informations?")) {
                document.getElementById('about').defaultValue = newG;
                document.getElementById('about').style.border = 'none';
                document.getElementById('about').disabled = true;
                document.getElementById("about").style.background = 'rgba(50, 23, 77, 0)';
                document.getElementById("saveProfile").style.display = 'block';
            } else {
                document.getElementById('about').value = document.getElementById('about').defaultValue;
                document.getElementById('about').style.border = 'none';
                document.getElementById('about').disabled = true;
                document.getElementById("about").style.background = 'rgba(50, 23, 77, 0)';
            }
        } else {
            document.getElementById('about').style.border = 'none';
            document.getElementById('about').disabled = true;
            document.getElementById("about").style.background = 'rgba(50, 23, 77, 0)';
        }
    };
};

$("[name='saveProfile']").on('click', updateProfile);