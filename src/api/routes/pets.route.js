const express = require('express');
const {
	getListPet,
	createNewPet,
	addNewLocationPets,
	updateLocationPets,
	setActiveForLocation,
	getPetById,
} = require('../controllers/pets.controller');
const router = express.Router();

router.get('/getListPet', getListPet);
router.post('/create-pet', createNewPet);
router.post('/update-location-pet', updateLocationPets);
router.post('/set-active-location-pet', setActiveForLocation);
router.post('/add-location-pet', addNewLocationPets);
router.post('/getInfoPet', getPetById);

module.exports = router;
