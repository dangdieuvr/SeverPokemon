const express = require('express');
const {
	getListPetsForUser,
	catchPetAction,
	getDetailUser,
	updateUserInfo,
	getBallNumberByUserId,
} = require('../controllers/user.controller');

const router = express.Router();
router.post('/get-pets-user', getListPetsForUser);
router.post('/catch-pet-user', catchPetAction);
router.post('/get-details-user', getDetailUser);
router.post('/update-info-user', updateUserInfo);
router.post('/getBallNumber', getBallNumberByUserId);

module.exports = router;
