// User model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	permission: String,
	pets: Array,
	gender: String,
	username: String,
	ballNumber: { type: Number, default: 50 },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
