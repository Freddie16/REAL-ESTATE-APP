const express = require('express');
const router = express.Router();
const rentController = require('../controllers/rentController');

//Define routes for rent related functionality
router.get('/', rentController.getAllRents);
router.post('/create/rent', rentController.createRent);
router.get('/:id', rentController.getRentById);
router.put('/:id', rentController.updateRentById);
router.delete('/:id', rentController.deleteRentById);

module.exports = router;