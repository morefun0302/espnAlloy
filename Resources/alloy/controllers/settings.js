function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.__alloyId6 = Ti.UI.createWindow({
        backgroundColor: "white",
        title: "Settings",
        id: "__alloyId6"
    });
    $.__views.label = Ti.UI.createLabel({
        text: "Settings",
        id: "label"
    });
    $.__views.__alloyId6.add($.__views.label);
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