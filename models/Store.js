const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    logoImage: {
        type: String,
    }
})

const Store = mongoose.model('Store', StoreSchema);

module.exports = Store;