function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.sportsLeagues = Ti.UI.createWindow({
        id: "sportsLeagues",
        title: ""
    });
    $.__views.sportsLeagues && $.addTopLevelView($.__views.sportsLeagues);
    $.__views.leaguesTable = Ti.UI.createTableView({
        id: "leaguesTable"
    });
    $.__views.sportsLeagues.add($.__views.leaguesTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.leaguesTable.title = args.title || "";
    $.sportsLeagues.title = args.title || "";
    var resource = args.url;
    var espnKey = "?apikey=epq7885ep4nyx4gdjfhfy9hx";
    var completeURL = resource + espnKey;
    Ti.API.info("Sport League HREF: " + completeURL);
    var leagueCollection = Alloy.createCollection("supportUriModel");
    leagueCollection.fetch({
        url: completeURL,
        success: function() {
            var l, leaguesObj;
            var leaguesTableData = [];
            _.each(leagueCollection.models, function(element) {
                var elementToJson = element.toJSON();
                var elementString = JSON.stringify(element);
                Ti.API.info("elementString: " + elementString);
                var uglySportName = elementToJson.name;
                var sportName = uglySportName.replace(/\w\S*/g, function(txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
                elementToJson.id;
                if (void 0 != elementToJson.links.api.sports) var sportHref = elementToJson.links.api.sports.href;
                void 0 != elementToJson.links.api.news && elementToJson.links.api.news.href;
                void 0 != elementToJson.links.api.notes && elementToJson.links.api.notes.href;
                void 0 != elementToJson.links.api.headlines && elementToJson.links.api.headlines.href;
                void 0 != elementToJson.links.api.events && elementToJson.links.api.events.href;
                var leaguesObjects = elementToJson.leagues;
                if ("[object Array]" === Object.prototype.toString.call(leaguesObjects)) for (l = 0; leaguesObjects.length > l; l++) {
                    leaguesObj = leaguesObjects[l];
                    var leagueName = leaguesObj.name;
                    leaguesObj.abbreviation;
                    leaguesObj.id;
                    leaguesObj.groupId;
                    leaguesObj.shortName;
                    var leagueSeasonObjects = leaguesObj.season;
                    if (void 0 != leagueSeasonObjects) {
                        void 0 != leagueSeasonObjects.year && leagueSeasonObjects.year;
                        void 0 != leagueSeasonObjects.type && leagueSeasonObjects.type;
                        void 0 != leagueSeasonObjects.description && leagueSeasonObjects.description;
                        void 0 != leagueSeasonObjects.startDate && leagueSeasonObjects.startDate;
                        void 0 != leagueSeasonObjects.endDate && leagueSeasonObjects.endDate;
                    }
                    var leagueWeekObjects = leaguesObj.week;
                    if (void 0 != leagueWeekObjects) {
                        void 0 != leagueWeekObjects.number && leagueWeekObjects.number;
                        void 0 != leagueWeekObjects.startDate && leagueWeekObjects.startDate;
                        void 0 != leagueWeekObjects.endDate && leagueWeekObjects.endDate;
                    }
                    if ("olympics" === leagueName || "action-sports" === leagueName) var row = Ti.UI.createTableViewRow({
                        title: sportName,
                        url: sportHref
                    }); else var row = Ti.UI.createTableViewRow({
                        title: leagueName,
                        url: sportHref
                    });
                    row.setColor("#000000");
                    row.setFont("Helvetica Neue");
                    row.setHasChild(true);
                    row.setBackgroundColor("#eeeeee");
                    row.setBackgroundSelectedColor("white");
                    row.setBackgroundFocusedColor("white");
                    row.setSelectedBackgroundColor("#ffffff");
                    row.setSelectedColor("#000000");
                    leaguesTableData.push(row);
                }
            });
            $.leaguesTable.setData(leaguesTableData);
        },
        error: function() {
            Ti.API.error("hmm - this is not good!");
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;