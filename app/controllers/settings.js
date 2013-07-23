Ti.API.info('Is user logged in? '+ userLoggedIn);


/* 
 * FORM VALIDATION 
 * 
 */
$.username.addEventListener('change', function(e){
    if(e.source.value.length < 1){
		$.username.borderWidth = "2dp";
		$.username.borderColor = "#B10713";
	} else if (e.source.value.length > 1){
		$.username.borderWidth = "2dp";
		$.username.borderColor = "#68B25B";
	};
});

$.password.addEventListener('change', function(e){
    if(e.source.value.length < 1){
		$.password.borderWidth = "2dp";
		$.password.borderColor = "#B10713";
	} else if (e.source.value.length > 1){
		$.password.borderWidth = "2dp";
		$.password.borderColor = "#68B25B";
	};
});

//Hide keyboard on double tap, if its visible
$.container.addEventListener('doubletap', function(e){
    $.username.blur();
    $.password.blur();    
});


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

