// ==============================================================================
// DEPENDENCIES
// npm packages that we will use to give our server useful functionality:
// ==============================================================================

var express = require("express");
var bodyParser = require("body-parser");


// ==============================================================================
// EXPRESS CONFIGURATION
// sets up the basic properties for our express server:
// ==============================================================================

// Tells node that we are creating an "express" server:
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing:
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});

