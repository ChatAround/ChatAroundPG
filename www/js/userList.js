var userId = $.cookie('userId');
var radius = $("[name = 'radius']").val();

function radiusChange() {
    radius = $("[name = 'radius']").val();
    $("#users").html("");

    var UserModel = Backbone.Model.extend();
    var UserCollection = Backbone.Collection.extend({
        url: 'http://chataround.ddns.net:8080/users' + '?' + $.param({id: userId, radius: radius}),
        model: UserModel
    });

    var users = new UserCollection();

    var updateFriendList = function (users) {
        var $users = $("#users");

        _.each(users, function (user) {
            var currentUser = user.username;
            if (currentUser != userName) {
                //if (currentUser != $currentUsers.username ) {
                var $user = $("<div>" + user.username + "</div>");
                $users.append($user);
                //}
            }
        });
    };

    users.fetch()
        .then(updateFriendList);
}

$("[name='ok']").on("click", radiusChange);

    var UserModel = Backbone.Model.extend();
    var UserCollection = Backbone.Collection.extend({
        url: 'http://chataround.ddns.net:8080/users' + '?' + $.param({id: userId, radius: radius}),
        model: UserModel
    });

//var CurrentUserModel = Backbone.Model.extend();
//var CurrentUserCollection = Backbone.Collection.extend({
//    model: CurrentUserModel
//});

    var users = new UserCollection();
//var currentUserList = new CurrentUserCollection();

//var FriendList = function (currentUserList) {
//    var $currentUsers = $("#currentUsers");
//
//    _.each(currentUserList, function (CurrentUserModel,user) {
//        var currentUser = CurrentUserModel.username;
//        var newUser = user.username;
//
//    });
//};

//var FriendList = function (currentUserList) {
//    var $currentUsers = $("#currentUsers");
//
//    _.each(currentUserList, function (user) {
//        var currentUser = user.username;
//        if (currentUser != userName) {
//            //if (currentUser != $currentUsers.username ) {
//            var $currentUser = $("<div>" + user.username + "</div>");
//            $currentUsers.append($currentUser);
//            //}
//        }
//    });
//};

    var updateFriendList = function (users) {
        var $users = $("#users");

        _.each(users, function (user) {
            var currentUser = user.username;
            if (currentUser != userName) {
                //if (currentUser != $currentUsers.username ) {
                var $user = $("<div>" + user.username + "</div>");
                $users.append($user);
                //}
            }
        });

        //var FriendList = function (currentUserList) {
        //    var $currentUsers = $("#currentUsers");
        //
        //    _.each(currentUserList, function (user) {
        //        var currentUser = user.username;
        //        if (currentUser != userName) {
        //            //if (currentUser != $currentUsers.username ) {
        //            var $currentUser = $("<div>" + user.username + "</div>");
        //            $currentUsers.append($currentUser);
        //            //}
        //        }
        //    });
        //    this.users.each(function(user){
        //        this.currentUserList.each(function(user){
        //            if(user === user){
        //                currentUserList.remove(user);
        //            }
        //        });
        //    });
        //};
    };

    users.fetch()
        .then(updateFriendList);

//currentUserList.fetch()
//    .then(FriendList);

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