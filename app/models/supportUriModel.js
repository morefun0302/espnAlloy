// var baseURL = "http://api.espn.com/v1/";
// var resource = "sports";
// var espnKey = "?apikey=epq7885ep4nyx4gdjfhfy9hx";
// 
// var completeURL = baseURL + resource + espnKey;

var _parentNode = "sports";

exports.definition = {  
    config: {
        "URL": "",
        //"debug": 1, 
        "adapter": {
            "type": "restapi",
            "collection_name": "supportUri",
            "idAttribute": "id"
        },
        "headers": { // your custom headers
            "Accept": "application/json; charset=utf-8"//,
        },
        "parentNode": _parentNode //your root node
    },      
    extendModel: function(Model) {      
        _.extend(Model.prototype, {});
        return Model;
    },  
    extendCollection: function(Collection) {        
        _.extend(Collection.prototype, {});
        return Collection;
    }       
};