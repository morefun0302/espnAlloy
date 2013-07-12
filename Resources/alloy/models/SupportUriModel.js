var _parentNode = "sports";

exports.definition = {
    config: {
        URL: "",
        adapter: {
            type: "restapi",
            collection_name: "supportUri",
            idAttribute: "id"
        },
        headers: {
            Accept: "application/json; charset=utf-8"
        },
        parentNode: _parentNode
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

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("supportUriModel", exports.definition, []);

collection = Alloy.C("supportUriModel", exports.definition, model);

exports.Model = model;

exports.Collection = collection;