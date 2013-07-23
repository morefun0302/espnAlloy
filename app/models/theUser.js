exports.definition = {

        config: {
        "columns": {
            "username": "TEXT",
            "password": "TEXT"
        },
        "defaults": {
            "username": "",
            "password": ""
        },
        "adapter": {
            "type": "sql",
            "collection_name": "theUser",
            "idAttribute": "id"
        }
    },

    extendModel: function(Model) {	
    	//Kinvey Mixins
    	_.extend(Model.prototype, Kinvey.Backbone.UserMixin);// Class properties.
    	_.extend(Model, Kinvey.Backbone.StaticUserMixin);// Static properties.	
    	//Validation
        _.extend(Model.prototype, {

            // Extend Backbone.Model
            customProperty: 'theUser',
            customFunction: function() {
                Ti.API.info('I am theUser model.');
            },	
        });
		
        return Model;
    },  
    extendCollection: function(Collection) {        
        _.extend(Collection.prototype, {});
        return Collection;
    }   
}