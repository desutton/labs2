/*
 * <dsCode> Inc. (c) 2019. This copyright is based on the Apache License 2.0. Please contact David Sutton for use of this software.
 */

const faye = require("faye");
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

// parsing application/json
app.use(bodyParser.json());
// parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

require("./routes")(app);

// load other assets
app.use(express.static("./"));

const port = "3000";
const host = "localhost";
const server = app.listen(port, host, function () {
    console.log("Server is running on port " + port + "...");
    console.log(`Open http://${host}:${port}/samples in browser`);
});

const bayeux = new faye.NodeAdapter({mount: "/samples/server/faye"});
bayeux.attach(server);