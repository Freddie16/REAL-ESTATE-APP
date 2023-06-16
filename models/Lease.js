const mongoose = require('mongoose');

const leaseSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  house: { type: mongoose.Schema.Types.ObjectId, ref: 'House', required: true },
  details: { type: String, required: true },
  // Add other lease properties as needed
});

const Lease = mongoose.model('Lease', leaseSchema);

module.exports = Lease;