const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    order_date: { type: Date, default: Date.now },
    status: { type: String, enum: ['processing', 'completed', 'canceled'], default: 'processing' }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
