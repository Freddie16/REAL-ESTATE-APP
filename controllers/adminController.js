const Admin = require('../models/Admin');
const Estate = require('../models/Estate');
const House = require('../models/House');
const RentPayment = require('../models/RentPayment');
const Tenant = require('../models/Tenant');

exports.estates = (req, res) => {
  Estate.find()
    .then(estates => {
      res.json(estates);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
};

exports.estateCount = (req, res) => {
  Estate.distinct('name')
    .then(estates => res.json({ estates: estates.length }))
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.houses = (req, res) => {
  House.find()
    .then(houses => {
      res.json(houses);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
};

exports.notifications = (req, res) => {
  // Logic to retrieve and handle notifications
  // Example implementation:
  // Replace with actual implementation
  const notifications = [];

  res.json(notifications);
};

exports.rentPayments = (req, res) => {
  RentPayment.find()
    .then(rentPayments => {
      res.json(rentPayments);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
};

exports.tenants = (req, res) => {
  Tenant.find()
    .then(tenants => {
      res.json(tenants);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
};