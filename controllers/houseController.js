const House = require('../models/House');
const Estate = require('../models/Estate');

exports.getAllHouses = (req, res) => {
  House.find()
    .then(houses => res.json(houses))
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.createHouse = (req, res) => {
    const { name, houseNumber, bedrooms, status, estateId } = req.body;
  
    Estate.findById(estateId)
      .then(estate => {
        if (!estate) {
          return res.status(404).json({ error: 'Estate not found' });
        }
  
        const newHouse = new House({
          name,
          houseNumber,
          bedrooms,
          status,
          estate: estateId,
        });
  
        newHouse.save()
          .then(house => {
            // Add the house ID to the estate's houses array
            estate.houses.push(house._id);
            estate.save().then(() => res.status(201).json(house));
          })
          .catch(err => res.status(500).json({ error: err.message }));
      })
      .catch(err => res.status(500).json({ error: err.message }));
  };

exports.getHouseById = (req, res) => {
  const houseId = req.params.houseId;

  House.findById(houseId)
    .then(house => {
      if (!house) {
        return res.status(404).json({ error: 'House not found' });
      }
      res.json(house);
    })
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.updateHouseById = (req, res) => {
  const houseId = req.params.houseId;
  const updates = req.body;

  House.findByIdAndUpdate(houseId, updates, { new: true })
    .then(house => {
      if (!house) {
        return res.status(404).json({ error: 'House not found' });
      }
      res.json(house);
    })
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.deleteHouseById = (req, res) => {
  const houseId = req.params.houseId;

  House.findByIdAndDelete(houseId)
    .then(house => {
      if (!house) {
        return res.status(404).json({ error: 'House not found' });
      }
      res.json({ message: 'House deleted successfully' });
    })
    .catch(err => res.status(500).json({ error: err.message }));
};