var express = require('express');
var Gossip = require('../models/Gossip.js');

module.exports = function(app) {
	app.get('/', function(req, res, next) {
	  app.render('index',function(err,html){
	    res.send(html);
	  });
	});

	app.get('/gossip', function(req, res, next) {
		Gossip.find({url:req.query.url}).exec(function(err,gossips){
			app.render('pages/gossip',{gossips:gossips},function(err,html){
			  	if (err) {
			  		throw err;
			  	}
			  	console.log(html);
			  	res.send(html);
			});
		});
	});

	app.get('/add-gossip',function(req,res,next){
		var gossip = new Gossip();
		gossip.url = req.query.url;
		gossip.gossip = req.query.gossip;
		gossip.save(function(err){
			if (err) {
				throw err;
			}
			res.end('{"success" : "Inserted Successfully", "status" : 200}');
		});
	});
}