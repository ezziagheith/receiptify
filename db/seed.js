const db = require('../models');

const storeList= require('./stores.json');

// removes all cities

db.Store.deleteMany({}, () => {
    // loops throught the json file
    storeList.forEach(event => {
        // for each one creates a city entry in the DB
        db.Store.create(event, (error, createdStore) => {
            if (error) return console.log(error);
            console.log(createdStore);
        });
    });
});