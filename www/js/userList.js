var UserModel = Backbone.Model.extend();
var UserCollection = Backbone.Collection.extend({
    url: 'http://chataround.ddns.net:8080/users',
    model: UserModel
});

var users = new UserCollection();

var updateFiendList = function (users) {
    var $users = $("#users");

    _.each(users, function (user) {
        var $user = $("<div>" + user.username + "</div>");

        $users.append($user);
    });
};

users.fetch()
    .then(updateFiendList);