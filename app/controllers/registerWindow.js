function closeModalDialog(){
	$.register.close();
}

if($.firstName.change == true){
	Ti.API.info("YAY");
}

function registerUser(e){
	
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
	
	
	if ($.firstName.value.length < 1){
		$.firstName.borderWidth = "2dp";
		$.firstName.borderColor = "#B10713";
	} else if ($.firstName.value.length > 1){
		$.firstName.borderWidth = "2dp";
		$.firstName.borderColor = "#68B25B";
	} else {
		
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

		    },
		    error : function(){
		        Ti.API.error("Registering User Failed!");
		    }
		});
		
	};

}

