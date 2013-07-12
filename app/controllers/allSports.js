var baseURL = "http://api.espn.com/v1/";
var resource = "sports";
var espnKey = "?apikey=epq7885ep4nyx4gdjfhfy9hx";  //Dont steal my keys yo!

var completeURL = baseURL + resource + espnKey;

var supportUriCollection = Alloy.createCollection("supportUriModel"); //or model
//the fetch method is an async call to the remote ESPN API. 
supportUriCollection.fetch({ 
	url:completeURL,
    success : function(){ 
    	
		var l, leaguesObj;
    	var sportTableData = [];

		// We are looping through the returned models from the remote ESPN API
        _.each(supportUriCollection.models, function(element, index, list){
            
			
			//This works too, but not as well
			//var name = element.get('name');		
			
			//Elements to JSON			
			var elementToJson = element.toJSON();
			
			var elementString = JSON.stringify(element);
            //Ti.API.info("elementString: "+ elementString);

				//Sport Name.
				var uglySportName = elementToJson.name;	
				
				//Make sport name Title Case (Sport Name)			
				var sportName = uglySportName.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
								

				//Sport ID
				var sportId = elementToJson.id;

				//Sport HREF
				if(elementToJson.links.api.sports != undefined){								
					var sportHref = elementToJson.links.api.sports.href;
				}

				//Sport News HREF
				if(elementToJson.links.api.news != undefined){				
					var sportNewsHref = elementToJson.links.api.news.href;
				}

				//Sport Notes Href
				if(elementToJson.links.api.notes != undefined){
					var sportNotesHref = elementToJson.links.api.notes.href;
				}

				//Sport Headlines Href
				if(elementToJson.links.api.headlines != undefined){
					var sportHeadlinesHref = elementToJson.links.api.headlines.href;
				}	

				//Sport Events Href
				if(elementToJson.links.api.events != undefined){
					var sportEventsHref = elementToJson.links.api.events.href;
				}

			    //Create the Grid Item
			    var gridItem = { 
			    				id: sportName, 
			    				title: sportName,
			    				url: sportHref, 
			    				backgroundColor: "#eeeeee", 
			    				backgroundSelectedColor: "#9C9C9C",
			    				click: function openNextWindow(e) { 
			    							Ti.API.info(this.title); 
			    							var detailController = Alloy.createController('sportLeagues', {
									        parentTab : $.allSports,
									        title : this.title,
									        url : this.url
										    });
										    $.allSports.open(detailController.getView(), {animated : true});
			    						}
			    				};	
			    sportTableData.push(gridItem);
       	

				//League Objects
				var leaguesObjects = elementToJson.leagues;
				
				//Iterate through League Objects
				if( Object.prototype.toString.call( leaguesObjects ) === '[object Array]' ) {
					var leaguesAvailable = true;
				    
				      for (l = 0; l < leaguesObjects.length; l++){
				 		  leaguesObj = leaguesObjects[l];
				 		
				 		  //League Name.
				 		  var leagueName = leaguesObj.name;
			
				 		  //League abbreviation.
				 		  var leagueAbbrv = leaguesObj.abbreviation;

				 		  //League Id.
				 		  var leagueId = leaguesObj.id;

				 		  //League Group Id.
				 		  var leagueGroupId = leaguesObj.groupId;

				 		  //League Short Name.
				 		  var leagueShortName = leaguesObj.shortName;
				 		 
				 		  //League Season Objects.
				 		  var leagueSeasonObjects = leaguesObj.season;
							if( leagueSeasonObjects != undefined ) {
								var leagueSeasonsAvailable = true;
									
									//Season Year.
							  		if( leagueSeasonObjects.year != undefined){
								 		var seasonYear = leagueSeasonObjects.year;
							  		}
								 		
									//Season Type.
							  		if( leagueSeasonObjects.type != undefined){
								 		var seasonType = leagueSeasonObjects.type;
							  		}
							  		
									//Season Description.
							  		if( leagueSeasonObjects.description != undefined){
								 		var seasonDescription = leagueSeasonObjects.description;
							  		}						  								    
									    					    
									//Season Start Date.
							  		if( leagueSeasonObjects.startDate != undefined){
								 		var seasonStartDate = leagueSeasonObjects.startDate;
							  		}		
							  		
									//Season End Date.
							  		if( leagueSeasonObjects.endDate != undefined){
								 		var seasonEndtDate = leagueSeasonObjects.endDate;
							  		}								  		
							  								    
							   }

				 		  //League Season Objects.
				 		  var leagueWeekObjects = leaguesObj.week;
							if( leagueWeekObjects != undefined ) {
								var leagueWeeksAvailable = true;
									
									//Week Number.
							  		if( leagueWeekObjects.number != undefined){
								 		var weekNumber = leagueWeekObjects.number;
							  		}   
									    					    
									//Week Start Date.
							  		if( leagueWeekObjects.startDate != undefined){
								 		var weekStartDate = leagueWeekObjects.startDate;
							  		}		
							  		
									//Week End Date.
							  		if( leagueWeekObjects.endDate != undefined){
								 		var weekEndDate = leagueWeekObjects.endDate;
							  		}								  		
							   }
							   
					            //Delete These after they are checked
					            // Ti.API.info("NAME: "+ sportName);
					            // Ti.API.info("ID: "+ sportId);
					            // Ti.API.info("HREF: "+ sportHref);
		   			            // Ti.API.info("___ League Name: "+ leagueName);

							   
						    }
						}		

        });
        
		
		//Init the Button Grid - http://docs.appcelerator.com/titanium/latest/#!/api/Alloy.widgets.buttongrid
		$.buttongrid.init({
		    buttons: sportTableData,
		    buttonWidth: Alloy.isTablet ? 200: 100,
		    buttonHeight: Alloy.isTablet ? 200 : 100,
		    backgroundColor: "#39567C",
		    backgroundSelectedColor: "#9CF1F1",
		    textColor: "#000000",
		    duration: 500
		});
				       
        
    },
    error : function(){
        Ti.API.error("hmm - this is not good!");
    }
});

	
