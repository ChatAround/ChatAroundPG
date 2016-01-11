var userName = $.cookie('userName');
var otherUser;

var userList= {
    updateUsers: function(){
        var radius =$("[name = 'radius']").val();

        var UserModel = Backbone.Model.extend();
        var UserCollection = Backbone.Collection.extend({
            url: 'http://chataround.ddns.net:8080/users' + '?' + $.param({
                username: userName,
                radius: radius}),
            model: UserModel
        });
        var users= new UserCollection();
        var updateCurrentUserList = function (users) {
            var $users = $("#users");
            var ul = document.getElementById("users");
            var elementsLI = ul.getElementsByTagName("li");

            _.each(users, function (user) {
                var isHere = 0;
                for (var x = 0; x < elementsLI.length; ++x) {
                    var dis = elementsLI[x].id;
                    if (user.username == dis) {
                        isHere = 1;
                        break;
                    }

                }
                if (isHere == 0 && user.username!=userName) {
                    var $user = $("<li id='" + user.username + "'>" + user.username + "</li>");
                    $users.append($user);
                }
               if(document.getElementById(dis).style.display = "none" && isHere == 1){
                   document.getElementById(dis).style.display = "block";
               }
            });

            for (var x = 0; x < elementsLI.length; ++x) {
                var dis = elementsLI[x].id;
                var deleted = 0;
                _.each(users, function (user) {
                    if ( dis == user.username) {
                        deleted = 1;
                    }
                });
                if (deleted == 0) {
                   document.getElementById(dis).style.display = "none";
                }
            }

        };
        users.fetch()
            .then(updateCurrentUserList);
    }};

setInterval(function () {

    userList.updateUsers();

    $("#users li").click(function() {
        otherUser = this.id;
        localStorage.setItem("storageName", otherUser);
        window.location.href = "otherProfile.html";
    });

}, 500);