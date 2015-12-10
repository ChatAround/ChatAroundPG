var userName = $.cookie('userName');

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

//var userup = {
//    updateFriendList: function(){
//        var updateCurrentFriendList = function (users) {
//            var $users = $("#users");
//
//            _.each(users, function (user) {
//                var currentUser = user.username;
//                if (currentUser != userName) {
//                    if (currentUser != $users.username ) {
//                        var $user = $("<div>" + user.username + "</div>");
//                        $users.append($user);
//                    }
//                }
//            });
//        };
//        users.fetch()
//            .then(updateCurrentFriendList);
//    }};
//setInterval(function () {
//    userup.updateFriendList();
//}, 1000);