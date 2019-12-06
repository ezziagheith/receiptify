const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.receipts.showReceipt),
router.get('/:receiptId', ctrl.receipts.showOneReceipt),
router.post('/:userId/:storeName', ctrl.receipts.createReceipt),
router.put('/:receiptId', ctrl.receipts.updateReceipt),
router.get('/:id/receipts', ctrl.receipts.usersReceipts),
router.get('/author/:id', ctrl.receipts.authorName),
router.get('/store/:storeName', ctrl.receipts.storeReceipts),
router.delete('/:id', ctrl.receipts.destroy)



module.exports = router;