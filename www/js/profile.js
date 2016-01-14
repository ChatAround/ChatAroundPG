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
        var gender = UserProfile.gender;
        $('#gender').val(gender);
        var country = UserProfile.country;
        $('#country').val(country);
        $('#city').val(UserProfile.city);
        $('#birthday').val(UserProfile.birthday);
        var about = UserProfile.about;
        $('#about').val(about);
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
                window.alert("Changes saved!");
                document.getElementById("saveProfile").style.display = 'none';
                document.getElementById("resetFields").style.display = 'none';
            })
    };


//edit profile
//window.onload = function() {
    document.getElementById("editCo").onclick = function() {
        document.getElementById("coMinLetters").style.display = "none";
        document.getElementById("emptyCountryError").style.display = 'none';
        document.getElementById("country").disabled = false;
        document.getElementById("country").style.background = 'white';
        document.getElementById("country").style.border = '1px solid #32174d';
        document.getElementById("country").focus();
    };
    document.getElementById("country").onblur = function() {
        var newCountry = document.getElementById("country").value;
        console.log(newCountry.length);
        if (jQuery.trim(newCountry).length == 0) {
            document.getElementById("emptyCountryError").style.display = 'block';
        }else if (newCountry.length >= 4) {
            document.getElementById("country").defaultValue = newCountry;
            document.getElementById("country").style.border = 'none';
            document.getElementById("coMinLetters").style.display = 'none';
            document.getElementById("emptyCountryError").style.display = 'none';
            document.getElementById("country").disabled = true;
            document.getElementById("country").style.background = 'rgba(50, 23, 77 ,0)';
            if (newCountry != UserProfile.country) {
                document.getElementById("saveProfile").style.display = 'inline';
                document.getElementById("resetFields").style.display = 'inline';
            } else {
                document.getElementById("country").style.border = 'none';
                document.getElementById("coMinLetters").style.display = 'none';
                document.getElementById("emptyCountryError").style.display = 'none';
                document.getElementById("country").disabled = true;
                document.getElementById("country").style.background = 'rgba(50, 23, 77 0)';
            }
        } else {
            document.getElementById("coMinLetters").style.display = 'block';
        }
    };

    document.getElementById("editCi").onclick = function() {
        document.getElementById("ciMinLetters").style.display = "none";
        document.getElementById("emptyCityError").style.display = 'none';
        document.getElementById("city").disabled = false;
        document.getElementById("city").style.background = 'white';
        document.getElementById("city").style.border = '1px solid #32174d';
        document.getElementById("city").focus();
    };
    document.getElementById("city").onblur = function() {
        var newCity = document.getElementById("city").value;
        if (jQuery.trim(newCity).length == 0) {
            document.getElementById("emptyCityError").style.display = 'block';
        } else if (newCity.length >= 4) {
            document.getElementById("city").defaultValue = newCity;
            document.getElementById("city").style.border = 'none';
            document.getElementById("ciMinLetters").style.display = 'none';
            document.getElementById("emptyCityError").style.display = 'none';
            document.getElementById("city").disabled = true;
            document.getElementById("city").style.background = 'rgba(50, 23, 77 ,0)';
            if (newCity != UserProfile.city) {
                document.getElementById("saveProfile").style.display = 'inline';
                document.getElementById("resetFields").style.display = 'inline';
            } else {
                document.getElementById("city").style.border = 'none';
                document.getElementById("ciMinLetters").style.display = 'none';
                document.getElementById("emptyCityError").style.display = 'none';
                document.getElementById("city").disabled = true;
                document.getElementById("city").style.background = 'rgba(50, 23, 77 0)';
            }
        } else {
            document.getElementById("ciMinLetters").style.display = 'block';
        }
    };

    document.getElementById("editAbout").onclick = function() {
        document.getElementById("emptyCountryError").style.display = 'none';
        document.getElementById('about').disabled = false;
        document.getElementById("about").style.background = 'white';
        document.getElementById('about').style.border = '1px solid #32174d';
        document.getElementById('about').focus();
    };
    document.getElementById("about").onblur = function() {
        var newAbout = document.getElementById("about").value;
        if (jQuery.trim(newAbout).length == 0) {
            document.getElementById("emptyAboutError").style.display = 'block';
        } else {
            document.getElementById("about").defaultValue = newAbout;
            document.getElementById("about").style.border = 'none';
            document.getElementById("emptyAboutError").style.display = 'none';
            document.getElementById("about").disabled = true;
            document.getElementById("about").style.background = 'rgba(50, 23, 77 ,0)';
            if (newAbout != UserProfile.about) {
                document.getElementById("saveProfile").style.display = 'inline';
                document.getElementById("resetFields").style.display = 'inline';
            } else {
                document.getElementById("about").style.border = 'none';
                document.getElementById("emptyAboutError").style.display = 'none';
                document.getElementById("about").disabled = true;
                document.getElementById("about").style.background = 'rgba(50, 23, 77 0)';
            }
        }
    };
//};

var resetFields = function() {
    location.reload();
};



$("[name='saveProfile']").on('click', updateProfile);
$("[name='resetFields']").on('click', resetFields);