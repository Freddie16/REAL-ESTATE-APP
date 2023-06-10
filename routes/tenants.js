const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenantController');


//Define routes for tenant related functionality
router.get('/lease', tenantController.lease);
router.get('/pay-rent', tenantController.payRent);
router.get('/rent-payments', tenantController.payRent);
router.get('/vacant-houses', tenantController.vacantHouses);

module.exports = router;