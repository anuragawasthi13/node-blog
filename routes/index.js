module.exports = function(app){
	app.get('/',function(req,res){
		res.render('index',{});
		//res.send("index got this");
	});
	app.get('/post/:postId',function(req,res){

		res.render('post',{});
	});
	app.get('/about',function(req,res){
		res.render('about',{});
	});
	app.get('/contact',function(req,res){
		res.render('contact',{});
	});
}
module.exports.index = function(req,res){
	res.render('index',{});
	//res.send("index got this");
}
