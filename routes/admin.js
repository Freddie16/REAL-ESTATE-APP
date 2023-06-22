const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


//Define routes for admin related functionality
//router.get('/dashboard', adminController.dashboard);
router.get('/estates', adminController.getAllEstates);
router.get('/estates/count', adminController.estateCount);
router.get('/houses', adminController.houses);
router.get('/notifications', adminController.notifications);
router.get('/rentpayments', adminController.rentPayments);
router.get('/tenants', adminController.tenants);

module.exports = router;