// does what is says
function openModalDialog(e) {	
	var w=Alloy.createController('registerWindow').getView();
    w.open({
		modal : true
	});
}

