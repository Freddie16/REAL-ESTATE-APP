const express = require('express');
const router = express.Router();
const houseController = require('../controllers/houseController');

// House Routes
router.get('/', houseController.getAllHouses);
router.post('/', houseController.createHouse);
router.get('/:houseId', houseController.getHouseById);
router.put('/:houseId', houseController.updateHouseById);
router.delete('/:houseId', houseController.deleteHouseById);

module.exports = router;