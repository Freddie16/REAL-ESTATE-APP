const RentPayment = require('../models/RentPayment');
const Tenant = require('../models/Tenant');

exports.getAllRentPayments = (req, res) => {
  RentPayment.find()
    .then(rentPayments => res.json(rentPayments))
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.createRentPayment = (req, res) => {
  const { tenantId, rentAmount } = req.body;

  Tenant.findById(tenantId)
    .then(tenant => {
      if (!tenant) {
        return res.status(404).json({ error: 'Tenant not found' });
      }

      const newRentPayment = new RentPayment({
        tenant: tenantId,
        amount: rentAmount,
        date: Date.now(),
      });

      newRentPayment.save()
        .then(rentPayment => res.status(201).json(rentPayment))
        .catch(err => res.status(500).json({ error: err.message }));
    })
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.getRentPaymentById = (req, res) => {
  const paymentId = req.params.paymentId;

  RentPayment.findById(paymentId)
    .then(rentPayment => {
      if (!rentPayment) {
        return res.status(404).json({ error: 'Rent payment not found' });
      }
      res.json(rentPayment);
    })
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.updateRentPaymentById = (req, res) => {
  const paymentId = req.params.paymentId;
  const updates = req.body;

  RentPayment.findByIdAndUpdate(paymentId, updates, { new: true })
    .then(rentPayment => {
      if (!rentPayment) {
        return res.status(404).json({ error: 'Rent payment not found' });
      }
      res.json(rentPayment);
    })
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.deleteRentPaymentById = (req, res) => {
  const paymentId = req.params.paymentId;

  RentPayment.findByIdAndDelete(paymentId)
    .then(rentPayment => {
      if (!rentPayment) {
        return res.status(404).json({ error: 'Rent payment not found' });
      }
      res.json({ message: 'Rent payment deleted successfully' });
    })
    .catch(err => res.status(500).json({ error: err.message }));
};