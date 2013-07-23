function Controller() {
    function closeModalDialog() {
        $.register.close();
    }
    function registerUser() {
        Kinvey.Backbone.User.exists($.userName.value, {
            success: function() {
                var dialog = Ti.UI.createAlertDialog({
                    ok: "Okay",
                    message: "Looks like that Username already exists!",
                    title: "Ooops"
                });
                dialog.addEventListener("click", function() {
                    $.userName.focus();
                });
                dialog.show();
            },
            error: function() {
                Ti.API.error("Username Doesnt Exist!");
            }
        });
        if (1 > $.firstName.value.length) {
            $.firstName.borderWidth = "2dp";
            $.firstName.borderColor = "#B10713";
        } else if ($.firstName.value.length > 1) {
            $.firstName.borderWidth = "2dp";
            $.firstName.borderColor = "#68B25B";
        } else {
            var registerUser = new Kinvey.Backbone.User();
            registerUser.save({
                username: $.userName.value,
                password: $.pwReg.value,
                email: $.userEmail.value,
                first_name: $.firstName.value,
                last_name: $.lastName.value
            }, {
                success: function(model, response) {
                    response._id;
                    response._acl;
                    response._kmd;
                    response.username;
                    response.password;
                    var userEmail = response.email;
                    Ti.API.info("user email: " + userEmail);
                },
                error: function() {
                    Ti.API.error("Registering User Failed!");
                }
            });
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.register = Ti.UI.createWindow({
        backgroundColor: "#eeeeee",
        id: "register",
        title: "Register"
    });
    $.__views.register && $.addTopLevelView($.__views.register);
    $.__views.firstName = Ti.UI.createTextField({
        backgroundColor: "white",
        width: "200dp",
        height: "30dp",
        top: "30dp",
        borderRadius: 10,
        id: "firstName",
        hintText: "First Name"
    });
    $.__views.register.add($.__views.firstName);
    $.__views.lastName = Ti.UI.createTextField({
        backgroundColor: "white",
        width: "200dp",
        height: "30dp",
        top: "70dp",
        borderRadius: 10,
        id: "lastName",
        hintText: "Last Name"
    });
    $.__views.register.add($.__views.lastName);
    $.__views.userName = Ti.UI.createTextField({
        backgroundColor: "white",
        width: "200dp",
        height: "30dp",
        top: "110dp",
        borderRadius: 10,
        id: "userName",
        hintText: "Username"
    });
    $.__views.register.add($.__views.userName);
    $.__views.pwReg = Ti.UI.createTextField({
        backgroundColor: "white",
        width: "200dp",
        height: "30dp",
        top: "150dp",
        borderRadius: 10,
        passwordMask: true,
        id: "pwReg",
        hintText: "Password"
    });
    $.__views.register.add($.__views.pwReg);
    $.__views.userEmail = Ti.UI.createTextField({
        backgroundColor: "white",
        width: "200dp",
        height: "30dp",
        top: "190dp",
        borderRadius: 10,
        id: "userEmail",
        hintText: "Email"
    });
    $.__views.register.add($.__views.userEmail);
    $.__views.registerBtn = Ti.UI.createButton({
        backgroundColor: "white",
        width: "200dp",
        height: "30dp",
        top: "230dp",
        borderRadius: 10,
        id: "registerBtn",
        title: "Submit"
    });
    $.__views.register.add($.__views.registerBtn);
    registerUser ? $.__views.registerBtn.addEventListener("click", registerUser) : __defers["$.__views.registerBtn!click!registerUser"] = true;
    $.__views.login_cancel = Ti.UI.createLabel({
        text: "Cancel",
        id: "login_cancel",
        bottom: "20"
    });
    $.__views.register.add($.__views.login_cancel);
    closeModalDialog ? $.__views.login_cancel.addEventListener("click", closeModalDialog) : __defers["$.__views.login_cancel!click!closeModalDialog"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    true == $.firstName.change && Ti.API.info("YAY");
    __defers["$.__views.registerBtn!click!registerUser"] && $.__views.registerBtn.addEventListener("click", registerUser);
    __defers["$.__views.login_cancel!click!closeModalDialog"] && $.__views.login_cancel.addEventListener("click", closeModalDialog);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;