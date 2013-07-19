function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.__alloyId6 = Ti.UI.createWindow({
        title: "Settings",
        id: "__alloyId6"
    });
    $.__views.username = Ti.UI.createTextField({
        backgroundColor: "white",
        width: "200dp",
        height: "50dp",
        top: "100dp",
        id: "username",
        hintText: "Username"
    });
    $.__views.__alloyId6.add($.__views.username);
    $.__views.password = Ti.UI.createTextField({
        backgroundColor: "white",
        width: "200dp",
        height: "50dp",
        top: "200dp",
        id: "password",
        hintText: "Password"
    });
    $.__views.__alloyId6.add($.__views.password);
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
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;