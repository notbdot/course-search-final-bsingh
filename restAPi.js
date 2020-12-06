var express = require("express");
var app = express();

var api_routes = require('./api_routes.js');
app.use('/api', api_routes);

app.use('/demo', express.static('front_end'));

//server
app.listen(3000, function() {
    console.log("Server is running");
    //console.log(course);
})