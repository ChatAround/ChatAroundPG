var userId = $.cookie('userId');
var radius = $("[name = 'radius']").val();

function radiusChange() {
    radius = $("[name = 'radius']").val();
    $("#users").html("");

    var UserModel = Backbone.Model.extend();
    var UserCollection = Backbone.Collection.extend({
        url: 'http://chataround.ddns.net:8080/users' + '?' + $.param({username: userName, radius: radius}),
        model: UserModel
    });

    var users = new UserCollection();

    var updateFriendList = function (users) {
        var $users = $("#users");

        _.each(users, function (user) {
            var currentUser = user.username;
            if (currentUser != userName) {
                var $user = $("<div><a href='profile.html'>" + user.username + "</a></div>");
                $users.append($user);
            }
        });
    };

    users.fetch()
        .then(updateFriendList);
}

$("[name='save']").on("click", radiusChange);

var UserModel = Backbone.Model.extend();
var UserCollection = Backbone.Collection.extend({
    url: 'http://chataround.ddns.net:8080/users' + '?' + $.param({username: userName, radius: radius}),
    model: UserModel
});

var users = new UserCollection();
var updateFriendList = function (users) {
    var $users = $("#users");
    _.each(users, function (user) {
        var currentUser = user.username;
        if (currentUser != userName) {
            var $user = $("<div><a href='profile.html'>" + user.username + "</a></div>");
            $users.append($user);
        }
    });
};

users.fetch()
    .then(updateFriendList);