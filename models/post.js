'use strict';

var mongoose =require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
	created:{
		type:String
	},
	postId:{
		type:String,
		unique:true
	},
	title:{
		type:String
	},
	meta_title:{
		type:String
	},
	content:{
		type:String
	}
});

var Post = module.exports = mongoose.model("Post",PostSchema);
