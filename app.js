/**
*****
@author: Anurag Awasthi
*****
**/
var chalk=require("chalk");
var express = require("express");
var exphbs = require("express-handlebars");
var body_parser = require("body-parser");
var app = express();
var chalk = require("chalk");
var path = require("path");
var index_route=require('./routes/index');
var api=require('./routes/api');
var mongoose = require("mongoose");
var config = {
	port: 3000,
	db_url: "mongodb://localhost/blogdb",
}

//mongoose connection

var db = mongoose.connect(config.db_url, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
		process.exit(-1);
	}
});
mongoose.connection.on('error', function(err) {
	console.error(chalk.red('MongoDB connection error: ' + err));
	process.exit(-1);
});


//app configuration

app.use(express.static(path.join(__dirname + '/public')));
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
  defaultLayout: 'layout'
}));
app.set('view engine', 'handlebars');
app.use(body_parser.json());



//production mode error handling

//dumb method to show request url on console
app.use(function(req, res, next) {
	console.log("requset for ", req.url);
	next();
});
//router setup
index_route(app);
api(app);
app.get("*",function(req,res,next){
	res.redirect("/");
	console.log("redirected to index page");
});

app.listen(config.port, function() {
	console.log(chalk.grey("server is listening on port :: 	", config.port));
});