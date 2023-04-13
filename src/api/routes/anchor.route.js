const express = require('express');
const {
	getListAnchor,
	createNewAnchor,
	updateAnchor,
	deleteAnchor,
} = require('../controllers/anchor.controller');
const router = express.Router();

router.get('/getListAnchor', getListAnchor);
router.post('/create-anchor', createNewAnchor);
router.put('/update-anchor/:id', updateAnchor);
router.delete('/delete-anchor/:id', deleteAnchor);

module.exports = router;
