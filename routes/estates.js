const express = require('express');
const router = express.Router();
const estateController = require('../controllers/estateController');

router.get('/', estateController.getAllEstates);
router.post('/create/estate', estateController.createEstate);
router.get('/:estateId', estateController.getEstateById);
router.put('/:estateId', estateController.updateEstateById);
router.delete('/:estateId', estateController.deleteEstateById);
//router.get('/:estateId/houses', estateController.getHousesInEstate);

module.exports = router;