const Tenant = require('../models/Tenant');

exports.getAllTenants = (req, res) => {
  Tenant.find()
    .then(tenants => res.json(tenants))
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.createTenant = (req, res) => {
  const { name, age, email } = req.body;

  const newTenant = new Tenant({
    name,
    age,
    email,
  });

  newTenant.save()
    .then(tenant => res.status(201).json(tenant))
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.getTenantById = (req, res) => {
  const tenantId = req.params.tenantId;

  Tenant.findById(tenantId)
    .then(tenant => {
      if (!tenant) {
        return res.status(404).json({ error: 'Tenant not found' });
      }
      res.json(tenant);
    })
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.updateTenantById = (req, res) => {
  const tenantId = req.params.tenantId;
  const updates = req.body;

  Tenant.findByIdAndUpdate(tenantId, updates, { new: true })
    .then(tenant => {
      if (!tenant) {
        return res.status(404).json({ error: 'Tenant not found' });
      }
      res.json(tenant);
    })
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.deleteTenantById = (req, res) => {
  const tenantId = req.params.tenantId;

  Tenant.findByIdAndDelete(tenantId)
    .then(tenant => {
      if (!tenant) {
        return res.status(404).json({ error: 'Tenant not found' });
      }
      res.json({ message: 'Tenant deleted successfully' });
    })
    .catch(err => res.status(500).json({ error: err.message }));
};