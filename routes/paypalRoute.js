/*const express = require('express');
const router = express.Router();
const {
  createOrder,
  captureOrder,
  getTransactionDetails,
  getAllTransactions
} = require('../Controller/paypalController');

// إنشاء طلب دفع جديد
router.post('/create-order', createOrder);

// تأكيد واستكمال الدفع
router.post('/capture-order', captureOrder);

// الحصول على تفاصيل معاملة محددة
router.get('/transaction/:orderId', getTransactionDetails);

// الحصول على جميع المعاملات
router.get('/transactions', getAllTransactions);

module.exports = router;*/































const express = require('express');
const router = express.Router();
const {
  createOrder,
  captureOrder,
  getTransactionDetails,
  getAllTransactions,
  approveOrder // ⬅️ الجديد
} = require('../Controller/paypalController');

// إنشاء طلب دفع جديد
router.post('/create-order', createOrder);

// تأكيد واستكمال الدفع
router.post('/capture-order', captureOrder);

// الموافقة على الطلب ⬅️ الجديد
router.post('/approve-order', approveOrder);

// الحصول على تفاصيل معاملة محددة
router.get('/transaction/:orderId', getTransactionDetails);

// الحصول على جميع المعاملات
router.get('/transactions', getAllTransactions);

module.exports = router;