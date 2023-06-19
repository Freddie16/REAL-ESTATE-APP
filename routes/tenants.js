const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenantController');
const leaseController = require('../controllers/leaseController');

// Tenant Routes
router.get('/', tenantController.getAllTenants);
router.post('/', tenantController.createTenant);
router.get('/:tenantId', tenantController.getTenantById);
router.put('/:tenantId', tenantController.updateTenantById);
router.delete('/:tenantId', tenantController.deleteTenantById);

// Lease Routes
router.get('/leases', leaseController.getAllLeases);
router.post('/create/leases', leaseController.createLease);
router.get('/leases/:leaseId', leaseController.getLeaseById);
router.put('/leases/:leaseId', leaseController.updateLeaseById);
router.delete('/leases/:leaseId', leaseController.deleteLeaseById);





module.exports = router;