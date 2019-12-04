const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.stores.showStore),
router.get('/:storeName', ctrl.stores.showOneStore),
router.get('/id/:id', ctrl.stores.showOneStoreById),
router.post('/', ctrl.stores.createStore)



module.exports = router;