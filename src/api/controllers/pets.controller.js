const Pet = require('../models/pets.model');

const getListPet = async (req, res) => {
	try {
		const pets = await Pet.find();
		res.json(pets);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal server error' });
	}
};

// tạo mới 1 pokemon
const createNewPet = async (req, res) => {
	try {
		const { name } = req.body;

		const pet = new Pet({
			name,
		});
		await pet.save();

		res.json({
			success: true,
			message: 'Create pet successful',
			data: {
				pet,
			},
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal server error' });
	}
};

// thêm vị trí xuất hiện của pokemon trên bản đổ
const addNewLocationPets = async (req, res) => {
	try {
		const { id, coordinates, location_name } = req.body;
		const pet = await Pet.findById(id);
		if (!pet) {
			return res.status(404).json({ message: 'Pet not found' });
		}
		pet.locations.push({ coordinates, location_name });
		await pet.save();

		res.json({
			success: true,
			message: 'Add a location of pet successful',
			data: {
				pet,
			},
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal server error' });
	}
};

// cập nhật vị trí xuất hiện của pokemon trên bản đồ
const updateLocationPets = async (req, res) => {
	try {
		const { id, idCoordinates, coordinates, location_name, isActive } =
			req.body;

		const pet = await Pet.findById(id);
		if (!pet) {
			return res.status(404).json({ message: 'Pet not found' });
		}

		let { locations } = pet;
		locations = locations.map((location) => {
			if (location._id == idCoordinates) {
				location.coordinates = coordinates;
				location.location_name = location_name;
				location.active = isActive;
			}
			return location;
		});

		await pet.save();

		res.json({
			success: true,
			message: 'Update location successful',
			data: {
				pet,
			},
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal server error' });
	}
};

// set active cho 1 vị trí của pokemon
const setActiveForLocation = async (req, res) => {
	try {
		const { id, idCoordinates, isActive } = req.body;

		const pet = await Pet.findById(id);
		if (!pet) {
			return res.status(404).json({ message: 'Pet not found' });
		}

		let { locations } = pet;
		locations = locations.map((location) => {
			if (location._id == idCoordinates) {
				location.active = isActive;
			}
			return locations;
		});

		await pet.save();

		res.json({ success: true, message: 'Set active successful' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal server error' });
	}
};

//get detail info pet
const getPetById = async (req, res) => {
	try {
		const { id } = req.body;
		const pet = await Pet.findById(id);
		if (!pet) {
			return res.json({ success: false, message: 'Pet not found' });
		}

		console.log(pet);
		res.json({
			success: true,
			data: {
				pet,
			},
		});
	} catch (error) {
		res.status(500).json({ success: false, message: 'Internal server error' });
	}
};

module.exports = {
	getListPet,
	createNewPet,
	updateLocationPets,
	addNewLocationPets,
	setActiveForLocation,
	getPetById,
};
