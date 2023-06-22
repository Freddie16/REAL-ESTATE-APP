const Admin = require('../models/Admin');
const Estate = require('../models/Estate');
const House = require('../models/House');
const RentPayment = require('../models/RentPayment');
const Tenant = require('../models/Tenant');


exports.getAllEstates = (req, res) => {
  Estate.aggregate([
    {
      $lookup: {
        from: 'houses',
        let: { estateId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$estate', '$$estateId'] },
            },
          },
        ],
        as: 'houses',
      },
    },
    {
      $project: {
        name: 1,
        location: 1,
        totalUnits: { $size: '$houses' },
        waterRate: 1,
        electricityRate: 1,
        paybill: 1,
        vacancies: {
          $size: {
            $filter: {
              input: '$houses',
              cond: { $eq: ['$$this.status', 'vacant'] },
            },
          },
        },
      },
    },
    {
      $group: {
        _id: null,
        totalEstates: { $sum: 1 },
        totalVacancies: { $sum: '$vacancies' },
        estates: { $push: '$$ROOT' },
      },
    },
    {
      $project: {
        _id: 0,
        totalEstates: 1,
        totalVacancies: 1,
        estates: 1,
      },
    },
  ])
    .then(data => {
      const { totalEstates, totalVacancies, estates } = data[0];

      res.json({ totalEstates, totalVacancies, estates });
    })
    .catch(err => res.status(500).json({ error: err.message }));
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