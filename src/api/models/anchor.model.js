const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const anchorSchema = new Schema({
	name: String,
	SerializedTime: String,
	Latitude: Number,
	Longitude: Number,
	Altitude: Number,
	Heading: Number,
	EunRotation: {
		x: Number,
		y: Number,
		z: Number,
		w: Number,
	},
	userIdChecked: Array,
});

const Anchor = mongoose.model('Anchor', anchorSchema);

module.exports = Anchor;
