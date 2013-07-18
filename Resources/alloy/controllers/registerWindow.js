function Controller() {
    function closeModalDialog() {
        $.register.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.register = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "register"
    });
    $.__views.register && $.addTopLevelView($.__views.register);
    $.__views.__alloyId6 = Ti.UI.createLabel({
        text: "Register Window",
        top: "20",
        id: "__alloyId6"
    });
    $.__views.register.add($.__views.__alloyId6);
    $.__views.login_cancel = Ti.UI.createButton({
        title: "Cancel",
        id: "login_cancel"
    });
    $.__views.register.add($.__views.login_cancel);
    closeModalDialog ? $.__views.login_cancel.addEventListener("click", closeModalDialog) : __defers["$.__views.login_cancel!click!closeModalDialog"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.login_cancel!click!closeModalDialog"] && $.__views.login_cancel.addEventListener("click", closeModalDialog);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;