/**
 * Created by Stratos on 31/12/2015.
 */
var otherUser = localStorage.getItem("storageName");

var otherProfileModel = Backbone.Model.extend({
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

var otherProfileCollection = Backbone.Collection.extend({
    url: 'http://chataround.ddns.net:8080/userProfile' + '?' + $.param({ username: otherUser}),
    model: otherProfileModel
});

var otherProfile = new otherProfileCollection();

var getOtherProfile = function(otherProfile) {
    $('#other_prof_user').val(otherProfile.username);
    $('#other_firstname').val(otherProfile.firstName);
    $('#other_lastname').val(otherProfile.surName);
    $('#other_gender').val(otherProfile.gender);
    $('#other_country').val(otherProfile.country);
    $('#other_city').val(otherProfile.city);
    $('#other_birthday').val(otherProfile.birthday);
    $('#other_about').val(otherProfile.about);
};

otherProfile.fetch()
.then(getOtherProfile);

