/** grab the arguments passed to this controller from Alloy.createController("rowTemplate",#arguments#) */
var args = arguments[0] || {};
 
/** set the label.text value for this row */
$.leagueName.setText(args.leagueName || "Row # Unknown");