/*const paypal = require('@paypal/checkout-server-sdk');

const configureEnvironment = () => {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  return process.env.NODE_ENV === 'production'
    ? new paypal.core.LiveEnvironment(clientId, clientSecret)
    : new paypal.core.SandboxEnvironment(clientId, clientSecret);
};

const client = () => {
  return new paypal.core.PayPalHttpClient(configureEnvironment());
};

module.exports = { client };*/






























// ✅ استيراد PayPal SDK أولاً
 const paypal = require('@paypal/checkout-server-sdk');

/*const configureEnvironment = () => {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  return process.env.NODE_ENV === 'development'
    ? new paypal.core.LiveEnvironment(clientId, clientSecret)
    : new paypal.core.SandboxEnvironment(clientId, clientSecret);
};*/




const configureEnvironment = () => {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  // استخدام Sandbox في development
  if (process.env.NODE_ENV === 'development') {
    console.log('Using PayPal Sandbox environment');
    return new paypal.core.SandboxEnvironment(clientId, clientSecret);
  }
  
  // استخدام Live في production
  console.log('Using PayPal Live environment');
  return new paypal.core.LiveEnvironment(clientId, clientSecret);
};

const client = () => {
  return new paypal.core.PayPalHttpClient(configureEnvironment());
};

module.exports = { client };  














/*const { client } = require('../config/paypal');
const Transaction = require('../Model/Transaction');
const paypal = require('@paypal/checkout-server-sdk');

// زيادة وقت المهلة للعميل
const configureEnvironment = () => {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  return process.env.NODE_ENV === 'production'
    ? new paypal.core.LiveEnvironment(clientId, clientSecret)
    : new paypal.core.SandboxEnvironment(clientId, clientSecret);
};

const client = () => {
  const httpClient = new paypal.core.PayPalHttpClient(configureEnvironment());
  // زيادة وقت المهلة إلى 60 ثانية
  httpClient.setTimeout(60000);
  return httpClient;
};

module.exports = { client };*/