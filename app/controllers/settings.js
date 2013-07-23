Ti.API.info('Is user logged in? '+ userLoggedIn);
 
var theUser;

function userLogIn(e){
	if ($.username.value ==="" || $.password.value ===""){
    	alert("You need to put a user id in");
	} else {	
			
			var userToLogin = new Kinvey.Backbone.User();
		
			var promise = userToLogin.login({
				username : $.username.value,
				password : $.password.value
				}, {
				success: function(model, response, options) { 	
					userLoggedIn = true;
			     	
					var userId    = response._id;
					var userAcl   = response._acl;
					var userKmd   = response._kmd;
					var userName  = response.username;
					var passWord  = response.password;
					var userEmail = response.email;
			     	
					Ti.API.info('user name: ' + userName );
			        
			        userToLogin = new Kinvey.Backbone.User({username:userName, password:passWord});		         
			        		         
			        isUserLoggedIn();
				}
				});
	};
};


function isUserLoggedIn(e){
	Ti.API.info('Is user logged in? '+ userLoggedIn);
	
	 var theUserCollection = new Kinvey.Backbone.UserCollection('userToLogin'); 
	 
	 theUserCollection.fetch({	 	
	 	success : function(){ 
			_.each(theUserCollection.models, function(element, index, list){
				//Elements to JSON			
				var elementToJson = element.toJSON();
				
				var elementString = JSON.stringify(element);
	            Ti.API.info("elementString: "+ elementString);
				
				
			});	

	    },
	    error : function(){
	        Ti.API.error("blarg!");
	    }
	 	
	 }); 

	var activeUser = Kinvey.Backbone.getActiveUser();
	var promise = activeUser.me({
	    success: function(model, response, options) {
				var userId    = response._id;
				var userAcl   = response._acl;
				var userKmd   = response._kmd;
				var userName  = response.username;
				var passWord  = response.password;
				var userEmail = response.email;
		     	
				Ti.API.info('THE ACTIVE USER IS: ' + userName );
	        
	    },
	    error : function(){
	        Ti.API.error("Setting Active User Failed!");
	    }
	});


}

