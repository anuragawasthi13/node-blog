
var Post = require('./../models/post.js');
var dateFormat = require("dateformat");
var cl=console.log;

module.exports = function(app) {
	app.get('/api', function(req, res) {
		res.send("api got this");
	});
	app.get('/posts', function(req, res) {
		Post.find({},function(err,data){
			if(!err){
				cl("got the post data",data);
				res.status(200).json(data);
			}
			else{
				cl("error occured\n",err);
			}
		});
	});
	app.post('/post',function(req,res){
		var postId = req.body.postId;
		cl("request for this postId -->  ",postId);
		Post.findOne({
			postId:postId
		}).exec(function(err,data){
			if(!err && data){
				cl("successful response from database");
				res.status(200).json(data);
			} else{
				cl("error in retrieving data form database");
				res.redirect("/");
				//res.status(400).json("error occured");

				// TODO : implement flash messaging
				//req.flash("error_msg","something happened");
			}
		});
	});
	app.post('/posts/create',function(req,res){
		var title = req.body.title;
		var meta_title = req.body.meta_title;
		var content = req.body.content;

		var now= new Date();
		var postId=Number(now).toString();
		var post = new Post({
			postId:postId,
			title:title,
			meta_title:meta_title,
			content:content,
			created:dateFormat(now,"mmmm dS, yyyy")
		});
		post.save(function(err){
			if(!err){
				cl("no error in saving data");
				res.status(200).json({
					"postCreate":{
						"success":true,
						"data":"your post has been saved"
					}
				});
			}
			else{
				cl("error in saving data\n",err);
				res.status(200).json({
					"postCreate":{
						"success":false,
						"data":"your post has not been saved"
					}
				});
			}
		})
	});
}