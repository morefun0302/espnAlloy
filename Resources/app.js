var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var Kinvey = Alloy.Globals.Kinvey = require("kinvey-titanium-1.0.3");

var kInit = Kinvey.init({
    appKey: "kid_VTpfUIDqlM",
    appSecret: "edff11d7b38741948dfcde8c1bbe328d"
});

Alloy.createController("index");