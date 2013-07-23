function Controller() {
    function userLogIn() {
        if ("" === $.username.value || "" === $.password.value) alert("You need to put a user id in"); else {
            var userToLogin = new Kinvey.Backbone.User();
            userToLogin.login({
                username: $.username.value,
                password: $.password.value
            }, {
                success: function(model, response) {
                    userLoggedIn = true;
                    response._id;
                    response._acl;
                    response._kmd;
                    var userName = response.username;
                    var passWord = response.password;
                    response.email;
                    Ti.API.info("user name: " + userName);
                    userToLogin = new Kinvey.Backbone.User({
                        username: userName,
                        password: passWord
                    });
                    isUserLoggedIn();
                }
            });
        }
    }
    function isUserLoggedIn() {
        Ti.API.info("Is user logged in? " + userLoggedIn);
        var theUserCollection = new Kinvey.Backbone.UserCollection("userToLogin");
        theUserCollection.fetch({
            success: function() {
                _.each(theUserCollection.models, function(element) {
                    element.toJSON();
                    var elementString = JSON.stringify(element);
                    Ti.API.info("elementString: " + elementString);
                });
            },
            error: function() {
                Ti.API.error("blarg!");
            }
        });
        var activeUser = Kinvey.Backbone.getActiveUser();
        activeUser.me({
            success: function(model, response) {
                response._id;
                response._acl;
                response._kmd;
                var userName = response.username;
                response.password;
                response.email;
                Ti.API.info("THE ACTIVE USER IS: " + userName);
            },
            error: function() {
                Ti.API.error("Setting Active User Failed!");
            }
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.__alloyId6 = Ti.UI.createWindow({
        title: "Settings",
        id: "__alloyId6"
    });
    $.__views.username = Ti.UI.createTextField({
        backgroundColor: "white",
        width: "200dp",
        height: "30dp",
        top: "80dp",
        id: "username",
        hintText: "Username"
    });
    $.__views.__alloyId6.add($.__views.username);
    $.__views.password = Ti.UI.createTextField({
        backgroundColor: "white",
        width: "200dp",
        height: "30dp",
        top: "120dp",
        id: "password",
        hintText: "Password"
    });
    $.__views.__alloyId6.add($.__views.password);
    $.__views.logInBtn = Ti.UI.createButton({
        backgroundColor: "white",
        width: "200dp",
        height: "30dp",
        top: "160dp",
        title: "Log In",
        id: "logInBtn"
    });
    $.__views.__alloyId6.add($.__views.logInBtn);
    userLogIn ? $.__views.logInBtn.addEventListener("click", userLogIn) : __defers["$.__views.logInBtn!click!userLogIn"] = true;
    $.__views.toolbar = Ti.UI.createView({
        bottom: 0,
        height: "44dp",
        id: "toolbar"
    });
    $.__views.__alloyId6.add($.__views.toolbar);
    $.__views.__alloyId7 = Alloy.createController("toolbar", {
        id: "__alloyId7",
        __parentSymbol: $.__views.toolbar
    });
    $.__views.__alloyId7.setParent($.__views.toolbar);
    $.__views.tab2 = Ti.UI.createTab({
        window: $.__views.__alloyId6,
        id: "tab2",
        title: "Settings",
        icon: "KS_nav_views.png"
    });
    $.__views.tab2 && $.addTopLevelView($.__views.tab2);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.API.info("Is user logged in? " + userLoggedIn);
    __defers["$.__views.logInBtn!click!userLogIn"] && $.__views.logInBtn.addEventListener("click", userLogIn);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;