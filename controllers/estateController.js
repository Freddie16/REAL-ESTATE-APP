const Estate = require('../models/Estate');
const House = require('../models/Houses');

exports.getAllEstates = (req, res) => {
  Estate.find()
    .then(estates => res.json(estates))
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.createEstate = (req, res) => {
    console.log(req.body)
  const { name, location } = req.body;

  const newEstate = new Estate({
    name,
    location,
  });

  newEstate.save()
    .then(estate => res.status(201).json(estate))
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: err.message })
    });
};

exports.getEstateById = (req, res) => {
  const estateId = req.params.estateId;

  Estate.findById(estateId)
    .then(estate => {
      if (!estate) {
        return res.status(404).json({ error: 'Estate not found' });
      }
      res.json(estate);
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
      res.json({ message: 'Estate deleted successfully' });
    })
    .catch(err => res.status(500).json({ error: err.message }));
};


exports.getHousesInEstateById = (req, res) => {
    const estateId = req.params.estateId;
    
    House.find({ estate: estateId })
    .then(houses => res.json(houses))
    .catch(err => res.status(500).json({ error: err.message }));
    };