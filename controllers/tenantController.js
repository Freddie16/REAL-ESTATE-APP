const Tenant = require('../models/Tenant');

exports.lease = (req, res) => {
  Tenant.find()
    .then(tenants => {
      res.render('userLease', { tenants });
    })
    .catch(err => res.status(500).json({ error: err.message }));
  
};

exports.payRent = (req, res) => {
  const tenantId = req.params.tenantId;
  const rentAmount = req.body.amount;

  Tenant.findById(tenantId)
    .then(tenant => {
      if (!tenant) {
        return res.status(404).json({ error: 'Tenant not found'});
      }
      res.render('userPayRent', { tenant, rentAmount});
    })
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.rentPayments = (req, res) => {
  const tenantId = req.params.tenantId;

  Tenant.findById(tenantId)
    .then(tenant => {
        if(!tenant) {
          return res.status(404).json({ error: 'Tenant not found' });
        }
        res.render('userRentPayments', { tenant, rentPayments});
    })
    .catch(err => res.status(500).json({ error: error.message}));
};

exports.vacanthouses = (req, res) => {
  Tenant.find({ status: 'vacant' })
    .then(vacantHouses => {
      res.render('userVacantHouses', { vacantHouses });
    })
    .catch(err => res.status(500).json({ error: err.message }));
};