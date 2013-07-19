function closeModalDialog(){
	$.register.close();
}

function registerUser(e){
	if ($.userName.value ==="" || $.pwReg.value ===""){
    	alert("You need to put a user id in");
	} else {
		
		var promise = Kinvey.User.signup({
		    username	: $.userName.value,
		    password	: $.pwReg.value,
		    email	 	: $.userEmail.value,
		    first_name	: $.firstName.value,
		    last_name	: $.lastName.value
		}, {
		    success: function(response) {
	           	var regSuccess = true;
    	
		    	var userId    = response._id;
		    	var userAcl   = response._acl;
		    	var userKmd   = response._kmd;
		    	var userName  = response.username;
		    	var passWord  = response.password;
		    	var userEmail = response.email;
		    	
		        Ti.API.info('user email: ' + userEmail );

		    }
		});
		
	};

}

