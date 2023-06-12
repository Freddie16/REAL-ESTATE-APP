const Rent = require('../models/Rent');

exports.getAllRents = (req, res) => {
  Rent.find()
    .then(rents => res.json(rents))
    .catch(err => res.status(500).json({error: err.massage}));
};

//create new rent
exports.createRent = (req, res) => {
    const { propertyId, tenantId, amount} =req.body;

    const newRent = new Rent ({
      property: propertyId,
      tenant: tenantId,
      amount,
    });

    newRent.save()
      .then(rent => res.status(201).json(rent))
      .catch(err => res.status(500).json({error: err.message}));
};

exports.getRentById = (req, res) => {
    const rentId = req.params.id;


    Rent.findById = (rentId)
        .then(rent => {
          if (!rent) {
            return res.status(404).json({error: 'Rent not found'});
          }
          res.join(rent);
        })
        .catch(err => res.status(500).json({error: err.message}));
};

exports.updateRentById = (req, res) => {
  const rentId = req.params.id;
  const updateData = req.body;


  Rent.findByIdAndUpdate(rentId, updateData, {new: true})
      .then(updatedRent => {
          if (!updatedRent) {
            return res.status(404).json({ error: 'Rent not found'});

          }
          res.json(updatedRent);
      })
      .catch(err => res.status(500).json({error: err.message}));
};

exports.deleteRentById = (req, res) => {
    const rentId = req.params.id;

    Rent.findByIdAndRemove(rentId)
        .then(deletedRent => {
            if (!deletedRent) {
                return res.status(404).json({error: 'Rent not found'})
            }
            res.json({message: 'Rent deleted successfully'});
        })
        .catch(err => res.status(500).json({ error: err.message}));
};