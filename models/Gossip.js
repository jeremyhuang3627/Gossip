var mongoose = require('mongoose');

var GossipSchema = mongoose.Schema({
	url:String,
	gossip:String,
	timestamp:{ type: Date, default: Date.now }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Gossip', GossipSchema);