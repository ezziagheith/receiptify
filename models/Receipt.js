const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReceiptSchema = mongoose.Schema({
    receiptImage: {
        type: String,
        required: [true, 'Image is required'],
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    store: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
    }


})

const Receipt = mongoose.model('Receipt', ReceiptSchema);

module.exports = Receipt;