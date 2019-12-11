const bcrypt = require('bcryptjs');
const db = require('../models');

// Show all Receipts

const showReceipt = (req, res) => {
    db.Receipt.find({}, (err, allReceipt) => {
        if (err) return res.status(500)
        if (err) return res.status(500).json({
            status:500,
            error: [{ message: 'Something went wrong! Please try again'}],
        });
        res.json({
            status: 200,
            count: allReceipt.length,
            data: allReceipt,
            requestedAt: new Date().toLocaleString(),
        });
    });
};





// Show One Receipt

const showOneReceipt = (req, res) => {
    db.Receipt.findById(req.params.receiptId, (err, foundReceipt) => {
        if (err) return console.log(err);
        if (foundReceipt) {
            res.json({
                status: 200,
                count: 1,
                data: foundReceipt,
                requestedAt: new Date().toLocaleString,
            });
        } else {
            res.json({
                status: 404,
                count: 0,
                data: `Post with ID ${req.params.receiptId} was not found. Please try again.`
            })
        }
    })
}

// Create Receipt

const createReceipt = (req, res) => {
    const newReceipt = {...req.body, user:req.params.userId, store: req.params.storeId} 
    db.Receipt.create(newReceipt, (err, createdReceipt) => {
        if (err) return res.status(500).json({
            status: 500,
            error: [{ message: 'Something went wrong. Please try again', err}]
        });
        res.status(201).json({
            status: 201,
            count: 1,
            data: createdReceipt,
            dateCreated: new Date().toLocaleString(),
        });
        // FIND USER - PUSH RECEIPT
        db.User.findById({_id:req.params.userId}, (err, user) => {
            console.log(req.params)
            if (err) return console.log(err)
            if (user) {
                user.receipts.push(createdReceipt._id)
                user.save((err, result) => {
                    if (err) return console.log(err)
                    console.log(result)
                })
            }
        })
        // FIND STORE - PUSH RECEIPT
        db.Store.findById({_id:req.params.storeId}, (err, store) => {
            if (err) return console.log(err)
            if (store) {
                store.receipts.push(createdReceipt._id)
                store.save((err, result) => {
                    if (err) return console.log(err)
                    console.log(result)
                })
            }
        })
    })
}


// Update Receipt

const updateReceipt = (req, res) => {
    db.Receipt.findByIdAndUpdate(
        req.params.receiptId,
        req.body,
        {new: true}, (err, updatedReceipt) => {
            if (err) return res.status(500).json({
                status: 500,
                error: [{ message: 'Something went wrong. Please try again.'}],
            });
            res.json({
                status: 200,
                count: 1,
                data: updatedReceipt,
                requestedAt: new Date().toLocaleString()
            });
        })
}

// Users Receipts

const usersReceipts = (req, res) => {
    db.User.findById({_id:req.params.id}, (err, foundUser) => {
        if (err) return res.status(500)
        if (foundUser) {
            foundUser.populate({
                path: 'receipts',
                populate: {
                    path: 'store',
                    model: 'Store'
                }
            }).execPopulate((err, user) => {
                if (err) return res.status(500).json({err})
                res.send({status: 200, receipts: user.receipts})
            })
        } else {
            res.status(500).json({message: 'User not found'}) 
        }
    })
}

// Stores Receipts

const storeReceipts = (req, res) => {
    db.Store.findOne({urlName:req.params.storeName}, (err, foundStore) => {
        if (err) return res.status(500)
        if (foundStore) {
            foundStore.populate("receipts").execPopulate((err, store) => {
                if (err) return res.status(500).json({err})
                res.send({status: 200, receipts: store.receipts})
            })
        } else {
            res.status(500).json({message: 'Store not found'})
        }
    })
}


const authorName = (req, res) => {
    console.log(req.session)
    if (!req.session) return res.status(401).json({
        status: 401,
        message: 'Unauthorized. Please login and try again.'
    });
    db.User.findById({_id:req.params.id}, (err, foundAuthor) => {
        if (err) return res.status(500).json({
            status: 500,
            message: err,
        });
        res.status(200).json({
            status: 200,
            data: foundAuthor
        })
    })
}


// Delete Receipt

const destroy = (req, res) => {
    db.Receipt.findByIdAndDelete(
        req.params.id, (err, destroyReceipt) => {
            if (err) return res.status(500).json({
                status: 500,
                error: [{message: 'Something went wrong. Please try again'}]
            })
            res.json({
                status: 200,
                count: 1,
                data: destroyReceipt,
                requestedAt: new Date().toLocaleString()
            })
        }
    )
}

module.exports = {
    showReceipt,
    showOneReceipt,
    createReceipt,
    updateReceipt,
    usersReceipts,
    storeReceipts,
    authorName,
    destroy
}