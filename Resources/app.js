var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var Kinvey = Alloy.Globals.Kinvey = require("kinvey-titanium-1.0.3");

var kInit = Kinvey.init({
    appKey: "kid_VTpfUIDqlM",
    appSecret: "edff11d7b38741948dfcde8c1bbe328d"
}).then(function(activeUser) {
    var theUser = new Kinvey.Backbone.User(activeUser);
    theUser.me({
        success: function(model, response) {
            response._id;
            response._acl;
            response._kmd;
            var userName = response.username;
            response.password;
            response.email;
            Ti.API.info("THE ACTIVE USER IS: " + userName);
            var user = Kinvey.Backbone.getActiveUser();
            var status = user.getEmailVerification();
            Ti.API.info("Email Verification Status: " + status);
        },
        error: function() {
            Ti.API.error("No User Logged In!");
        }
    });
    Backbone.history.start();
});

var userLoggedIn;

Alloy.createController("index");