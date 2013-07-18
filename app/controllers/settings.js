//Use your own keys please.
var kInit = Kinvey.init({
    appKey    : 'kid_VTpfUIDqlM',
    appSecret : 'edff11d7b38741948dfcde8c1bbe328d'
});

kInit.then(function(activeUser) {
    var promise = Kinvey.User.login({
    username : 'admin',
    password : 'FI11giggs'
		}, {
    success: function(response) {
    	
    	var loginSuccess = true;
    	
    	var userId    = response._id;
    	var userAcl   = response._acl;
    	var userKmd   = response._kmd;
    	var userName  = response.username;
    	var passWord  = response.password;
    	var userEmail = response.email;
    	
        Ti.API.info('user name: ' + userName );
        
        
    }
	});

});




// var user = Kinvey.User.login('admin', 'FI11giggs', {
    // success: function(response) {
         // Ti.API.info('response: ' + response.kinvey);
    // }
// });

// var promise = Kinvey.ping();
// promise.then(function(response) {
    // Ti.API.info('Kinvey Ping Success. Kinvey Service is alive, version: ' + response.version + ', response: ' + response.kinvey);
// }, function(error) {
    // Ti.API.info('Kinvey Ping Failed. Response: ' + error.description);
// });