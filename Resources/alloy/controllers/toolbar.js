function Controller() {
    function openModalDialog() {
        var w = Alloy.createController("registerWindow").getView();
        w.open({
            modal: true
        });
    }
    function logOutUser() {
        var user = Kinvey.getActiveUser();
        null !== user && Kinvey.User.logout({
            success: function() {
                Ti.API.info("User Logged Out");
            },
            error: function() {
                Ti.API.error("hmm - this is not good!");
            }
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    var __alloyId9 = [];
    $.__views.registerCallOut = Ti.UI.createLabel({
        color: "#fff",
        font: {
            fontSize: "11dp"
        },
        text: "Need an account?",
        id: "registerCallOut"
    });
    __alloyId9.push($.__views.registerCallOut);
    $.__views.__alloyId10 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId9.push($.__views.__alloyId10);
    $.__views.logOutBtn = Ti.UI.createButton({
        style: Ti.UI.iPhone.SystemButtonStyle.BORDERED,
        backgroundColor: "red",
        title: "Log Out",
        id: "logOutBtn"
    });
    __alloyId9.push($.__views.logOutBtn);
    logOutUser ? $.__views.logOutBtn.addEventListener("click", logOutUser) : __defers["$.__views.logOutBtn!click!logOutUser"] = true;
    $.__views.__alloyId11 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId9.push($.__views.__alloyId11);
    $.__views.registerBtn = Ti.UI.createButton({
        style: Ti.UI.iPhone.SystemButtonStyle.BORDERED,
        backgroundColor: "#ff0000",
        title: "Register",
        id: "registerBtn"
    });
    __alloyId9.push($.__views.registerBtn);
    openModalDialog ? $.__views.registerBtn.addEventListener("click", openModalDialog) : __defers["$.__views.registerBtn!click!openModalDialog"] = true;
    $.__views.container = Ti.UI.iOS.createToolbar({
        barColor: "#776b65",
        zIndex: 100,
        items: __alloyId9,
        id: "container"
    });
    $.__views.container && $.addTopLevelView($.__views.container);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.logOutBtn!click!logOutUser"] && $.__views.logOutBtn.addEventListener("click", logOutUser);
    __defers["$.__views.registerBtn!click!openModalDialog"] && $.__views.registerBtn.addEventListener("click", openModalDialog);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;