const Anchor = require('../models/anchor.model');

const getListAnchor = async (req, res) => {
	try {
		const anchors = await Anchor.find();
		res.json(anchors);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal server error' });
	}
};

const createNewAnchor = async (req, res) => {
	try {
		const {
			name,
			SerializedTime,
			Latitude,
			Longitude,
			Altitude,
			Heading,
			EunRotation,
		} = req.body;

		const anchor = new Anchor({
			name,
			SerializedTime,
			Latitude,
			Longitude,
			Altitude,
			Heading,
			EunRotation,
		});
		await anchor.save();

		res.json({
			success: true,
			message: 'Create anchor successfully',
			data: {
				anchor,
			},
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal server error' });
	}
};

const updateAnchor = async (req, res) => {
	try {
		const { id } = req.params;
		const {
			name,
			SerializedTime,
			Latitude,
			Longitude,
			Altitude,
			Heading,
			EunRotation,
			userIdChecked,
		} = req.body;
		const anchor = await Anchor.findById(id);
		if (!anchor) {
			return res.status(404).json({ message: 'Anchor not found' });
		}

		anchor.name = name || anchor.name;
		anchor.SerializedTime = SerializedTime || anchor.SerializedTime;
		anchor.Latitude = Latitude || anchor.Latitude;
		anchor.Longitude = Longitude || anchor.Longitude;
		anchor.Altitude = Altitude || anchor.Altitude;
		anchor.Heading = Heading || anchor.Heading;
		anchor.EunRotation = EunRotation || anchor.EunRotation;
		anchor.userIdChecked = userIdChecked || anchor.userIdChecked;

		await anchor.save();

		res.json({
			success: true,
			message: 'Update anchor successfully',
			data: {
				anchor,
			},
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal server error' });
	}
};

const deleteAnchor = async (req, res) => {
	try {
		const { id } = req.params;

		const anchor = await Anchor.findById(id);
		if (!anchor) {
			return res.status(404).json({ message: 'Anchor not found' });
		}

		await anchor.remove();

		res.json({ success: true, message: 'Delete anchor successfully' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal server error' });
	}
};
module.exports = {
	getListAnchor,
	createNewAnchor,
	updateAnchor,
	deleteAnchor,
};
