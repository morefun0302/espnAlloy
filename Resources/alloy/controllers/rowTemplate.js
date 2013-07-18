function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.rowTemplate = Ti.UI.createTableViewRow({
        backgroundColor: "#fff",
        id: "rowTemplate"
    });
    $.__views.rowTemplate && $.addTopLevelView($.__views.rowTemplate);
    $.__views.leagueName = Ti.UI.createLabel({
        color: "gray",
        height: "50dp",
        left: "8dp",
        backgroundColor: "transparent",
        font: {
            fontFamily: "Helvetica",
            fontSize: "14dp",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        id: "leagueName"
    });
    $.__views.rowTemplate.add($.__views.leagueName);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.leagueName.setText(args.leagueName || "Row # Unknown");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;