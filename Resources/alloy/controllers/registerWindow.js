function Controller() {
    function closeModalDialog() {
        $.register.close();
    }
    function registerUserSubmit() {
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
                var userName = response.username;
                response.password;
                var userEmail = response.email;
                Ti.API.info("user email: " + userEmail);
                alert("Thank you for registering, an email verification is on the way.");
                Kinvey.Backbone.User.verifyEmail(userName, {
                    success: function() {
                        Ti.API.info("Confirm Email Sent!");
                    },
                    error: function() {
                        Ti.API.error("Confirm Email Failed!");
                    }
                });
            },
            error: function() {
                Ti.API.error("Registering User Failed!");
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
            }
        });
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
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
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
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
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
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
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
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
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
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: "200dp",
        height: "30dp",
        top: "190dp",
        borderRadius: 10,
        keyboardType: "KEYBOARD_EMAIL",
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
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
    registerUserSubmit ? $.__views.registerBtn.addEventListener("click", registerUserSubmit) : __defers["$.__views.registerBtn!click!registerUserSubmit"] = true;
    $.__views.login_cancel = Ti.UI.createLabel({
        text: "Cancel",
        id: "login_cancel",
        bottom: "20"
    });
    $.__views.register.add($.__views.login_cancel);
    closeModalDialog ? $.__views.login_cancel.addEventListener("click", closeModalDialog) : __defers["$.__views.login_cancel!click!closeModalDialog"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.firstName.addEventListener("change", function(e) {
        if (1 > e.source.value.length) {
            $.firstName.borderWidth = "2dp";
            $.firstName.borderColor = "#B10713";
        } else if (e.source.value.length > 1) {
            $.firstName.borderWidth = "2dp";
            $.firstName.borderColor = "#68B25B";
        }
    });
    $.lastName.addEventListener("change", function(e) {
        if (1 > e.source.value.length) {
            $.lastName.borderWidth = "2dp";
            $.lastName.borderColor = "#B10713";
        } else if (e.source.value.length > 1) {
            $.lastName.borderWidth = "2dp";
            $.lastName.borderColor = "#68B25B";
        }
    });
    $.register.addEventListener("doubletap", function() {
        $.firstName.blur();
        $.lastName.blur();
        $.userName.blur();
        $.pwReg.blur();
        $.userEmail.blur();
    });
    __defers["$.__views.registerBtn!click!registerUserSubmit"] && $.__views.registerBtn.addEventListener("click", registerUserSubmit);
    __defers["$.__views.login_cancel!click!closeModalDialog"] && $.__views.login_cancel.addEventListener("click", closeModalDialog);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;