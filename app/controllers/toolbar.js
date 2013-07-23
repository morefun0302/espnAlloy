// does what is says
function openModalDialog(e) {	
	var w=Alloy.createController('registerWindow').getView();
    w.open({
		modal : true
	});
}

function logOutUser(e){
	var user = Kinvey.getActiveUser();
	if(null !== user) {
	    var promise = Kinvey.User.logout({
	        success: function() {
	            Ti.API.info("User Logged Out")
	        },
		    error : function(){
		        Ti.API.error("hmm - this is not good!");
		    }
	    });
	}	
}
