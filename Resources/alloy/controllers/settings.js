function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.__alloyId7 = Ti.UI.createWindow({
        title: "Settings",
        id: "__alloyId7"
    });
    $.__views.username = Ti.UI.createTextField({
        backgroundColor: "white",
        width: "200dp",
        height: "50dp",
        top: "100dp",
        id: "username",
        hintText: "Username"
    });
    $.__views.__alloyId7.add($.__views.username);
    $.__views.password = Ti.UI.createTextField({
        backgroundColor: "white",
        width: "200dp",
        height: "50dp",
        top: "200dp",
        id: "password",
        hintText: "Password"
    });
    $.__views.__alloyId7.add($.__views.password);
    $.__views.toolbar = Ti.UI.createView({
        bottom: 0,
        height: "44dp",
        id: "toolbar"
    });
    $.__views.__alloyId7.add($.__views.toolbar);
    $.__views.__alloyId8 = Alloy.createController("toolbar", {
        id: "__alloyId8",
        __parentSymbol: $.__views.toolbar
    });
    $.__views.__alloyId8.setParent($.__views.toolbar);
    $.__views.tab2 = Ti.UI.createTab({
        window: $.__views.__alloyId7,
        id: "tab2",
        title: "Settings",
        icon: "KS_nav_views.png"
    });
    $.__views.tab2 && $.addTopLevelView($.__views.tab2);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var kInit = Kinvey.init({
        appKey: "kid_VTpfUIDqlM",
        appSecret: "edff11d7b38741948dfcde8c1bbe328d"
    });
    kInit.then(function() {
        Kinvey.User.login({
            username: "admin",
            password: "FI11giggs"
        }, {
            success: function(response) {
                response._id;
                response._acl;
                response._kmd;
                var userName = response.username;
                response.password;
                response.email;
                Ti.API.info("user name: " + userName);
            }
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;