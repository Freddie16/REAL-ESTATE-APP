const express = require('express');
const router = express.Router();
const rentPaymentController = require('../controllers/rentPaymentController');


// Rent Payment Routes
router.get('/', rentPaymentController.getAllRentPayments);
router.post('/', rentPaymentController.createRentPayment);
router.get('/:paymentId', rentPaymentController.getRentPaymentById);
router.put('/:paymentId', rentPaymentController.updateRentPaymentById);
router.delete('/:paymentId', rentPaymentController.deleteRentPaymentById);

module.exports = router;