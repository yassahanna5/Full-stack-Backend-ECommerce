 /*const { client } = require('../config/paypal');
const Transaction = require('../Model/Transaction');
const paypal = require('@paypal/checkout-server-sdk');
// إنشاء طلب دفع جديد
exports.createOrder = async (req, res) => {
  try {
    const { totalAmount, items, currency = 'USD' } = req.body;

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: currency,
          value: totalAmount,
          breakdown: {
            item_total: {
              currency_code: currency,
              value: totalAmount
            }
          }
        },
        items: items.map(item => ({
          name: item.title || item.name,
          quantity: item.quantity.toString(),
          unit_amount: {
            currency_code: currency,
            value: item.price.toString()
          }
        }))
      }],
      application_context: {
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW'
      }
    });

    const order = await client().execute(request);
    
    // حفظ المعاملة في قاعدة البيانات
    const transaction = new Transaction({
      orderId: order.result.id,
      amount: parseFloat(totalAmount),
      currency: currency,
      status: 'CREATED',
      items: items.map(item => ({
        productId: item.id || item._id,
        name: item.title || item.name,
        quantity: item.quantity,
        price: item.price
      }))
    });
    
    await transaction.save();

    res.json({ 
      success: true, 
      orderID: order.result.id,
      message: 'Order created successfully'
    });

  } catch (error) {
    console.error('Error creating PayPal order:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create order',
      error: error.message 
    });
  }
};

// تأكيد واستكمال الدفع
exports.captureOrder = async (req, res) => {
  try {
    const { orderID } = req.body;

    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    const capture = await client().execute(request);
    
    const captureDetails = capture.result;
    
    // تحديث حالة المعاملة في قاعدة البيانات
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { orderId: orderID },
      {
        status: 'COMPLETED',
        payerId: captureDetails.payer.payer_id,
        payerEmail: captureDetails.payer.email_address,
        updateTime: new Date()
      },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    res.json({ 
      success: true, 
      details: captureDetails,
      transaction: updatedTransaction,
      message: 'Payment captured successfully'
    });

  } catch (error) {
    console.error('Error capturing PayPal order:', error);
    
    // تحديث حالة المعاملة إلى فاشلة
    await Transaction.findOneAndUpdate(
      { orderId: req.body.orderID },
      { status: 'FAILED', updateTime: new Date() }
    );

    res.status(500).json({ 
      success: false, 
      message: 'Failed to capture payment',
      error: error.message 
    });
  }
};

// الحصول على تفاصيل المعاملة
exports.getTransactionDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const transaction = await Transaction.findOne({ orderId });
    if (!transaction) {
      return res.status(404).json({ 
        success: false, 
        message: 'Transaction not found' 
      });
    }

    res.json({ 
      success: true, 
      transaction 
    });

  } catch (error) {
    console.error('Error fetching transaction:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch transaction',
      error: error.message 
    });
  }
};

// الحصول على جميع المعاملات
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createTime: -1 });
    
    res.json({
      success: true,
      transactions,
      count: transactions.length
    });

  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transactions',
      error: error.message
    });
  }
}; */













 const { client } = require('../config/paypal');
const Transaction = require('../Model/Transaction');
const paypal = require('@paypal/checkout-server-sdk');

// إنشاء طلب دفع جديد
const createOrder = async (req, res) => {
  try {
    const { totalAmount, items, currency = 'EUR' } = req.body;

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: currency,
          value: totalAmount,
          breakdown: {
            item_total: {
              currency_code: currency,
              value: totalAmount
            }
          }
        },
        items: items.map(item => ({
          name: item.title || item.name,
          quantity: item.quantity.toString(),
          unit_amount: {
            currency_code: currency,
            value: item.price.toString()
          }
        }))
      }],
      application_context: {
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW'
      }
    });

    const order = await client().execute(request);
    
    // حفظ المعاملة في قاعدة البيانات
    const transaction = new Transaction({
      orderId: order.result.id,
      amount: parseFloat(totalAmount),
      currency: currency,
      status: 'CREATED',
      items: items.map(item => ({
        productId: item.id || item._id,
        name: item.title || item.name,
        quantity: item.quantity,
        price: item.price
      }))
    });
    
    await transaction.save();

    res.json({ 
      success: true, 
      orderID: order.result.id,
      message: 'Order created successfully'
    });

  } catch (error) {
    console.error('Error creating PayPal order:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create order',
      error: error.message 
    });
  }
};

// تأكيد واستكمال الدفع
const captureOrder = async (req, res) => {
  try {
    const { orderID } = req.body;

    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    const capture = await client().execute(request);
    
    const captureDetails = capture.result;
    
    // تحديث حالة المعاملة في قاعدة البيانات
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { orderId: orderID },
      {
        status: 'COMPLETED',
        payerId: captureDetails.payer.payer_id,
        payerEmail: captureDetails.payer.email_address,
        updateTime: new Date()
      },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    res.json({ 
      success: true, 
      details: captureDetails,
      transaction: updatedTransaction,
      message: 'Payment captured successfully'
    });

  } catch (error) {
    console.error('Error capturing PayPal order:', error);
    
    // تحديث حالة المعاملة إلى فاشلة
    await Transaction.findOneAndUpdate(
      { orderId: req.body.orderID },
      { status: 'FAILED', updateTime: new Date() }
    );

    res.status(500).json({ 
      success: false, 
      message: 'Failed to capture payment',
      error: error.message 
    });
  }
};

// الحصول على تفاصيل المعاملة
const getTransactionDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const transaction = await Transaction.findOne({ orderId });
    if (!transaction) {
      return res.status(404).json({ 
        success: false, 
        message: 'Transaction not found' 
      });
    }

    res.json({ 
      success: true, 
      transaction 
    });

  } catch (error) {
    console.error('Error fetching transaction:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch transaction',
      error: error.message 
    });
  }
};

// الحصول على جميع المعاملات
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createTime: -1 });
    
    res.json({
      success: true,
      transactions,
      count: transactions.length
    });

  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transactions',
      error: error.message
    });
  }
};

// الموافقة على الطلب
const approveOrder = async (req, res) => {
  try {
    const { orderID } = req.body;

    const updatedTransaction = await Transaction.findOneAndUpdate(
      { orderId: orderID },
      { status: 'APPROVED', updateTime: new Date() },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    res.json({ 
      success: true, 
      transaction: updatedTransaction,
      message: 'Order approved successfully'
    });

  } catch (error) {
    console.error('Error approving order:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to approve order',
      error: error.message 
    });
  }
};

// التصدير في نهاية الملف
module.exports = {
  createOrder,
  captureOrder,
  getTransactionDetails,
  getAllTransactions,
  approveOrder
};


























// تأكيد واستكمال الدفع
/*exports.captureOrder = async (req, res) => {
  try {
    const { orderID } = req.body;

    // التحقق أولاً من حالة الطلب قبل المحاولة
    const transaction = await Transaction.findOne({ orderId: orderID });
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    // إذا كان الطلب لم يوافق عليه بعد
    if (transaction.status !== 'APPROVED') {
      return res.status(422).json({
        success: false,
        message: 'Order not approved by payer yet',
        details: {
          issue: 'ORDER_NOT_APPROVED',
          description: 'Payer has not yet approved the Order for payment.'
        }
      });
    }

    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    const capture = await client().execute(request);
    
    const captureDetails = capture.result;
    
    // تحديث حالة المعاملة في قاعدة البيانات
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { orderId: orderID },
      {
        status: 'COMPLETED',
        payerId: captureDetails.payer.payer_id,
        payerEmail: captureDetails.payer.email_address,
        updateTime: new Date()
      },
      { new: true }
    );

    res.json({ 
      success: true, 
      details: captureDetails,
      transaction: updatedTransaction,
      message: 'Payment captured successfully'
    });

  } catch (error) {
    console.error('Error capturing PayPal order:', error);
    
    // إذا كان الخطأ بسبب انتهاء المهلة
    if (error.message.includes('timed out')) {
      return res.status(504).json({ 
        success: false, 
        message: 'Payment processing timed out. Please try again.',
        error: 'Request timed out'
      });
    }
    
    // إذا كان الخطأ بسبب عدم الموافقة على الطلب
    if (error.statusCode === 422) {
      return res.status(422).json({ 
        success: false, 
        message: 'Order not approved by payer yet',
        error: error.message 
      });
    }

    // تحديث حالة المعاملة إلى فاشلة
    await Transaction.findOneAndUpdate(
      { orderId: req.body.orderID },
      { status: 'FAILED', updateTime: new Date() }
    );

    res.status(500).json({ 
      success: false, 
      message: 'Failed to capture payment',
      error: error.message 
    });
  }
};*/




