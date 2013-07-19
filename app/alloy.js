// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

var Kinvey = Alloy.Globals.Kinvey = require('kinvey-titanium-1.0.3');

var kInit = Kinvey.init({
    appKey    : 'kid_VTpfUIDqlM',
    appSecret : 'edff11d7b38741948dfcde8c1bbe328d'
});