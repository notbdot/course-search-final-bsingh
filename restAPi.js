var PORT = process.env.PORT || 3000;
var express = require("express");
var app = express();

var api_routes = require('./api_routes.js');
app.use('/api', api_routes);

app.use('/demo', express.static('front_end'));

//server
app.listen(PORT, function() {
    console.log("Server is running");
    //console.log(course);
})
