function closeModalDialog(){
	$.register.close();
}


/* 
 * FORM VALIDATION 
 * 
 */
$.firstName.addEventListener('change', function(e){
    if(e.source.value.length < 1){
		$.firstName.borderWidth = "2dp";
		$.firstName.borderColor = "#B10713";
	} else if (e.source.value.length > 1){
		$.firstName.borderWidth = "2dp";
		$.firstName.borderColor = "#68B25B";
	};
});

$.lastName.addEventListener('change', function(e){
    if(e.source.value.length < 1){
		$.lastName.borderWidth = "2dp";
		$.lastName.borderColor = "#B10713";
	} else if (e.source.value.length > 1){
		$.lastName.borderWidth = "2dp";
		$.lastName.borderColor = "#68B25B";
	};
});

//Hide keyboard on double tap, if its visible
$.register.addEventListener('doubletap', function(e){
    $.firstName.blur();
    $.lastName.blur();
    $.userName.blur();
    $.pwReg.blur();
    $.userEmail.blur();  
});


/* 
 * Register User 
 * 
 */
function registerUserSubmit(e){
			
		var registerUser = new Kinvey.Backbone.User();
		
		var promise = registerUser.save({
		    username	: $.userName.value,
		    password	: $.pwReg.value,
		    email	 	: $.userEmail.value,
		    first_name	: $.firstName.value,
		    last_name	: $.lastName.value
		}, {
		    success: function(model, response, options) {
	           	var regSuccess = true;
    	
		    	var userId    = response._id;
		    	var userAcl   = response._acl;
		    	var userKmd   = response._kmd;
		    	var userName  = response.username;
		    	var passWord  = response.password;
		    	var userEmail = response.email;
		    	
		        Ti.API.info('user email: ' + userEmail );
		        
		        alert("Thank you for registering, an email verification is on the way.");
		        
		        var verifyNewUserEmail = Kinvey.Backbone.User.verifyEmail(userName, {
				    success: function() {
				        Ti.API.info("Confirm Email Sent!");
				    },
				    error : function(){
				        Ti.API.error("Confirm Email Failed!");
				    }
				});

		    },
		    error : function(){
		        Ti.API.error("Registering User Failed!");
				var checkUserNameExists = Kinvey.Backbone.User.exists($.userName.value, {
				    success: function(usernameExists) {
				       	//alert("Sorry, but that Username already exists!");
				       	
				       	  var dialog = Ti.UI.createAlertDialog({
						    ok: 'Okay',
						    message: 'Looks like that Username already exists!',
						    title: 'Ooops'
						  });
						  dialog.addEventListener('click', function(e){
						      $.userName.focus();
						  });
						  dialog.show();
				    },
				    error : function(){
				        Ti.API.error("Username Doesnt Exist!");
				    }
				});		        
		        
		    }
		});
		
}

