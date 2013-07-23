
//Bunch of user log in stuff and Kinvey
var Kinvey = Alloy.Globals.Kinvey = require('kinvey-titanium-1.0.3');

var kInit = Kinvey.init({
    appKey    : 'kid_VTpfUIDqlM',
    appSecret : 'edff11d7b38741948dfcde8c1bbe328d'
})
.then(function (activeUser){
	var theUser = new Kinvey.Backbone.User(activeUser);
	
	var promise = theUser.me({
	    success: function(model, response, options) {
				var userId    = response._id;
				var userAcl   = response._acl;
				var userKmd   = response._kmd;
				var userName  = response.username;
				var passWord  = response.password;
				var userEmail = response.email;
		     	
				Ti.API.info('THE ACTIVE USER IS: ' + userName );
	        
	    },
	    error : function(e){
	        Ti.API.error("No User Logged In!");
	    }
	});
	
	Backbone.history.start();
});


var userLoggedIn;