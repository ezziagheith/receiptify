const bcrypt = require('bcryptjs');
const db = require('../models');

// Show all Stores

const showStore = (req, res) => {
    db.Store.find({}, (err, allStore) => {
        if (err) return res.status(500).json({
            status: 500,
            error: [{message: 'Something went wrong. Please try again'}],
        });
        res.json({
            status: 200,
            count: allStore.length,
            data: allStore,
            requestedAt: new Date().toLocaleString()
        })
    })
}


// Show One Store

const showOneStore = (req, res) => {
    db.Store.findOne({urlName: req.params.storeName}, (err, foundStore) => {
        if (err) return console.log(err);
        if (foundStore) {
            res.json ({
                status: 200,
                count: 1,
                data: foundStore,
                requestedAt: new Date().toLocaleString(),
            });
        } else {
            res.json({
                status: 404,
                count: 0,
                data: `Store with name ${req.params.storeName} was not found. Please try again`
            })
        }
    }) 
}


// Show One Store by ID

const showOneStoreById = (req, res) => {
    db.Store.findById({_id: req.params.id}, (err, foundStore) => {
        if (err) return console.log(err);
        if (foundStore) {
            res.json({
                status: 200,
                count: 1,
                data: foundStore,
                requestedAt: new Date().toLocaleString(),
            })
        } else {
            res.json({
                status: 404,
                count: 0,
                data: `Store with ID ${req.params.id} was not found. Please try again`
            })
        }
    })
}

// Create Store

const createStore = (req, res) => {
    db.Store.create(req.body, (err, createdStore) => {
        if (err) return res.status(500).json({
            status: 500,
            error: [{message: 'Something went wrong. Please try again'}]
        });
        res.status(201).json({
            status: 201,
            count: 1,
            data: createdStore,
            dateCreated: new Date().toLocaleString(),
        })
    })
}


module.exports = {
    showStore,
    showOneStore, // this is how by storeName
    showOneStoreById,
    createStore,
}