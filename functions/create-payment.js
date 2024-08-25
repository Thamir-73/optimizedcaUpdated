const axios = require('axios');

const TAP_API_KEY = '38tap26';
const TAP_API_URL = 'https://api.tap.company/v2/charges';

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const orderData = JSON.parse(event.body);

    const payload = {
      amount: orderData.amount,
      currency: "SAR",  // Adjust currency as needed
      threeDSecure: true,
      save_card: false,
      customer: {
        first_name: orderData.billingAddress.firstName,
        last_name: orderData.billingAddress.lastName,
        email: orderData.email
      },
      source: { id: "src_all" },
      redirect: { url: "https://optimizedca.netlify.app/payment-complete.html" }  // Replace with your actual completion page URL
    };

    const response = await axios.post(TAP_API_URL, payload, {
      headers: {
        'Authorization': `Bearer ${TAP_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ payment_url: response.data.transaction.url })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create payment' })
    };
  }
};