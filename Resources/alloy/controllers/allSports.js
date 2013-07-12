function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    Alloy.Collections.instance("supportUriModel");
    $.__views.sportsTab = Ti.UI.createWindow({
        fullscreen: true,
        color: "#000",
        font: {
            fontSize: 15,
            fontFamily: "Helvetica Neue"
        },
        backgroundColor: "white",
        id: "sportsTab",
        title: "All Sports"
    });
    $.__views.buttongrid = Alloy.createWidget("com.appcelerator.buttongrid", "widget", {
        id: "buttongrid",
        __parentSymbol: $.__views.sportsTab
    });
    $.__views.buttongrid.setParent($.__views.sportsTab);
    $.__views.allSports = Ti.UI.createTab({
        window: $.__views.sportsTab,
        id: "allSports",
        title: "All Sports",
        icon: "KS_nav_ui.png"
    });
    $.__views.allSports && $.addTopLevelView($.__views.allSports);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var baseURL = "http://api.espn.com/v1/";
    var resource = "sports";
    var espnKey = "?apikey=epq7885ep4nyx4gdjfhfy9hx";
    var completeURL = baseURL + resource + espnKey;
    var supportUriCollection = Alloy.createCollection("supportUriModel");
    supportUriCollection.fetch({
        url: completeURL,
        success: function() {
            var l, leaguesObj;
            var sportTableData = [];
            _.each(supportUriCollection.models, function(element) {
                var elementToJson = element.toJSON();
                JSON.stringify(element);
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
                var gridItem = {
                    id: sportName,
                    title: sportName,
                    url: sportHref,
                    backgroundColor: "#eeeeee",
                    backgroundSelectedColor: "#9C9C9C",
                    click: function() {
                        Ti.API.info(this.title);
                        var detailController = Alloy.createController("sportLeagues", {
                            parentTab: $.allSports,
                            title: this.title,
                            url: this.url
                        });
                        $.allSports.open(detailController.getView(), {
                            animated: true
                        });
                    }
                };
                sportTableData.push(gridItem);
                var leaguesObjects = elementToJson.leagues;
                if ("[object Array]" === Object.prototype.toString.call(leaguesObjects)) for (l = 0; leaguesObjects.length > l; l++) {
                    leaguesObj = leaguesObjects[l];
                    leaguesObj.name;
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
                }
            });
            $.buttongrid.init({
                buttons: sportTableData,
                buttonWidth: Alloy.isTablet ? 200 : 100,
                buttonHeight: Alloy.isTablet ? 200 : 100,
                backgroundColor: "#39567C",
                backgroundSelectedColor: "#9CF1F1",
                textColor: "#000000",
                duration: 500
            });
        },
        error: function() {
            Ti.API.error("hmm - this is not good!");
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;