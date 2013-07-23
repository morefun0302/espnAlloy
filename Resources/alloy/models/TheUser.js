exports.definition = {
    config: {
        columns: {
            username: "TEXT",
            password: "TEXT"
        },
        defaults: {
            username: "",
            password: ""
        },
        adapter: {
            type: "sql",
            collection_name: "theUser",
            idAttribute: "id"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, Kinvey.Backbone.UserMixin);
        _.extend(Model, Kinvey.Backbone.StaticUserMixin);
        _.extend(Model.prototype, {
            customProperty: "theUser",
            customFunction: function() {
                Ti.API.info("I am theUser model.");
            }
        });
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("theUser", exports.definition, []);

collection = Alloy.C("theUser", exports.definition, model);

exports.Model = model;

exports.Collection = collection;