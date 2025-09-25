const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  payerId: String,
  payerEmail: String,
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  status: {
    type: String,
    enum: ['CREATED', 'APPROVED', 'COMPLETED', 'FAILED', 'REFUNDED'],
    default: 'CREATED'
  },
  items: [{
    productId: String,
    name: String,
    quantity: Number,
    price: Number
  }],
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

transactionSchema.pre('save', function(next) {
  this.updateTime = Date.now();
  next();
});

module.exports = mongoose.model('Transaction',transactionSchema  );