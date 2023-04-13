const User = require('../models/user.model');
const bcrypt = require('bcrypt');

// Register controller
const register = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Check if user already exists
		const userExists = await User.findOne({ email });
		if (userExists) {
			return res.json({ success: false, message: 'User already exists' });
		}

		// Create a new user
		const encryptedPassword = await bcrypt.hash(password, 10);
		const user = new User({ email, password: encryptedPassword, pets: [] });
		await user.save();

		res.json({
			success: true,
			message: 'User created successfully',
		});
	} catch (error) {
		res
			.status(500)
			.json({ success: false, message: 'Failed to register user' });
	}
};

// Login controller
const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Check if user exists
		const user = await User.findOne({ email });
		if (!user) {
			return res.json({ success: false, message: 'Invalid email or password' });
		}

		// Check if password is correct
		console.log(password, user.password);
		const isPasswordMatched = await bcrypt.compare(password, user.password);
		console.log('isPasswordMatched: ', isPasswordMatched);
		if (!isPasswordMatched) {
			return res.json({ success: false, message: 'Invalid email or password' });
		}

		// Generate JWT token
		// const token = user.generateAuthToken();
		console.log('user.permission: ', user.permission);
		res.json({
			success: true,
			message: 'Login Successful',
			data: {
				user,
				permission: user.permission,
				id: user._id,
			},
		});
	} catch (error) {
		res.status(500).json({ success: false, message: 'Failed to login' });
	}
};

// Logout controller
const logout = (req, res) => {
	res.json({ message: 'Logout successfully' });
};

module.exports = {
	register,
	login,
	logout,
};
