const User = require('../models/user.model');

const getListPetsForUser = async (req, res) => {
	try {
		const { id } = req.body;

		// Check if user exists
		const user = await User.findById(id);
		if (!user) {
			return res.json({ success: false, message: 'User not found' });
		}
		const { pets } = user;
		res.json({
			success: true,
			data: {
				pets,
			},
		});
	} catch (error) {
		res.status(500).json({ success: false, message: 'Failed get list pet' });
	}
};

const catchPetAction = async (req, res) => {
	try {
		const { idUser, idPet, isCatchSuccess } = req.body;

		// Check if user exists
		const user = await User.findById(idUser);

		if (!user) {
			return res.json({ success: false, message: 'User not found' });
		}
		const { ballNumber } = user;
		user.ballNumber = ballNumber - 1;
		await user.save();

		if (isCatchSuccess) {
			const { pets } = user;
			const exitsPet = pets.find((pet) => pet === idPet);

			if (!exitsPet) {
				pets.push(idPet);
				await user.save();
				res.json({
					success: true,
					data: {
						user,
					},
				});
			} else {
				res.json({
					success: false,
					message: 'Exists pet',
				});
			}
		} else {
			res.json({
				success: false,
				message: 'Catching Failed',
			});
		}
	} catch (error) {
		res.status(500).json({ success: false, message: 'Failed catching' });
	}
};

const getDetailUser = async (req, res) => {
	try {
		const { idUser } = req.body;
		// Check if user exists
		const user = await User.findById(idUser);

		if (!user) {
			return res.json({ success: false, message: 'User not found' });
		}

		return res.status(200).json({
			user,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: 'Failed catching' });
	}
};

const updateUserInfo = async (req, res) => {
	try {
		const { idUser, username, gender } = req.body;
		// Check if user exists
		const user = await User.findById(idUser);

		if (!user) {
			return res.json({ success: false, message: 'User not found' });
		}

		user.username = username;
		user.gender = gender;

		await user.save();

		return res.status(200).json({
			user: {
				...user._doc,
			},
		});
	} catch (error) {
		res.status(500).json({ success: false, message: 'Failed catching' });
	}
};

const getBallNumberByUserId = async (req, res) => {
	try {
		const { idUser } = req.body;

		// Check if user exists
		const user = await User.findById(idUser);

		if (!user) {
			return res.json({ success: false, message: 'User not found' });
		}
		const { ballNumber } = user;
		res.json({
			success: true,
			data: {
				ballNumber,
			},
		});
	} catch (error) {
		res.status(500).json({ success: false, message: 'Failed get list pet' });
	}
};

module.exports = {
	getListPetsForUser,
	catchPetAction,
	getDetailUser,
	updateUserInfo,
	getBallNumberByUserId,
};
