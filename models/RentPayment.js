const mongoose = require('mongoose');

const rentPaymentSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true, default: Date.now },
  // Add other rent payment properties as needed
});

const RentPayment = mongoose.model('RentPayment', rentPaymentSchema);

module.exports = RentPayment;