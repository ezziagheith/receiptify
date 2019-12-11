const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// PATH api/v1/stores

// Show All stores
router.get('/', ctrl.stores.showStore),

// Show One Store by url
router.get('/:storeName', ctrl.stores.showOneStore),

// Show One store by id
router.get('/id/:id', ctrl.stores.showOneStoreById),

// Create Store
router.post('/', ctrl.stores.createStore)



module.exports = router;