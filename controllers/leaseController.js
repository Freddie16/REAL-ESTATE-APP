const Lease = require('../models/Lease');

exports.getAllLeases = (req, res) => {
  Lease.find()
    .then(leases => res.json(leases))
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.createLease = (req, res) => {
  const { tenantId, houseId, leaseDetails } = req.body;

  const newLease = new Lease({
    tenant: tenantId,
    house: houseId,
    details: leaseDetails,
  });

  newLease.save()
    .then(lease => res.status(201).json(lease))
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.getLeaseById = (req, res) => {
  const leaseId = req.params.leaseId;

  Lease.findById(leaseId)
    .then(lease => {
      if (!lease) {
        return res.status(404).json({ error: 'Lease not found' });
      }
      res.json(lease);
    })
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.updateLeaseById = (req, res) => {
  const leaseId = req.params.leaseId;
  const updates = req.body;

  Lease.findByIdAndUpdate(leaseId, updates, { new: true })
    .then(lease => {
      if (!lease) {
        return res.status(404).json({ error: 'Lease not found' });
      }
      res.json(lease);
    })
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.deleteLeaseById = (req, res) => {
  const leaseId = req.params.leaseId;

  Lease.findByIdAndDelete(leaseId)
    .then(lease => {
      if (!lease) {
        return res.status(404).json({ error: 'Lease not found' });
      }
      res.json({ message: 'Lease deleted successfully' });
    })
    .catch(err => res.status(500).json({ error: err.message }));
};