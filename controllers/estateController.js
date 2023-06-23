const Estate = require('../models/Estate');
const House = require('../models/House');
const mongoose = require('mongoose');

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

exports.createEstate = (req, res) => {
  const { name, location, waterRate, electricityRate, paybill } = req.body;

  Estate.findOne({ name }) // Check if an estate with the same name already exists
    .then(existingEstate => {
      if (existingEstate) {
        return res.status(400).json({ error: "Estate name already exists" });
      }

      const newEstate = new Estate({
        name,
        location,
        waterRate,
        electricityRate,
        paybill,
      });

      newEstate.save()
        .then(estate => res.status(201).json(estate))
        .catch(err => res.status(500).json({ error: err.message }));
    })
    .catch(err => res.status(500).json({ error: err.message }));
};


exports.getEstateById = (req, res) => {
  const estateId = req.params.estateId;

  Estate.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(estateId) },
    },
    {
      $lookup: {
        from: 'houses',
        localField: 'houses',
        foreignField: '_id',
        as: 'houses',
      },
    },
    {
      $project: {
        name: 1,
        location: 1,
        totalHouses: { $size: '$houses' },
        totalVacancies: {
          $size: {
            $filter: {
              input: '$houses',
              cond: { $eq: ['$$this.status', 'vacant'] },
            },
          },
        },
        waterRate: 1,
        electricityRate: 1,
        paybill: 1,
        houses: 1,
      },
    },
  ])
    .then(estate => {
      if (estate.length === 0) {
        return res.status(404).json({ error: 'Estate not found' });
      }
      res.json(estate[0]);
    })
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.updateEstateById = (req, res) => {
  const estateId = req.params.estateId;
  const updates = req.body;

  Estate.findByIdAndUpdate(estateId, updates, { new: true })
    .then(estate => {
      if (!estate) {
        return res.status(404).json({ error: 'Estate not found' });
      }
      res.json(estate);
    })
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.deleteEstateById = (req, res) => {
  const estateId = req.params.estateId;
  Estate.findByIdAndDelete(estateId)
  .then(estate => {
    if (!estate) {
      return res.status(404).json({ error: 'Estate not found' });
    }
    
    // Delete all associated houses
    House.deleteMany({ estate: estateId })
      .then(() => {
        res.json({ message: 'Estate and associated houses deleted successfully' });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  })
  .catch(err => res.status(500).json({ error: err.message }));
};