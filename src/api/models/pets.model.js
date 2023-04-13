const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
	coordinates: String,
	location_name: String,
	active: { type: Boolean, default: true },
});

const petSchema = new Schema({
	name: String,
	locations: { type: [locationSchema], default: [] },
});
const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
