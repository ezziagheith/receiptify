const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReceiptSchema = mongoose.Schema({
    receiptImage: {
        type: String,
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
    },
    body: {
        type: String,
    }


})

const Receipt = mongoose.model('Receipt', ReceiptSchema);

module.exports = Receipt;