const axios = require('axios');

const TAP_API_KEY = process.env.TAP_API_KEY;
const TAP_API_URL = 'https://api.tap.company/v2/charges';

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const snipcartData = JSON.parse(event.body);
    console.log('Received Snipcart data:', snipcartData);

    const payload = {
      amount: snipcartData.amount,
      currency: snipcartData.currency,
      threeDSecure: true,
      save_card: false,
      customer: {
        first_name: snipcartData.billingAddress.firstName,
        last_name: snipcartData.billingAddress.lastName,
        email: snipcartData.email
      },
      source: { id: "src_all" },
      redirect: { url: "https://optimizedca.netlify.app/payment-complete.html" }
    };

    console.log('Sending payload to Tap Payments:', payload);

    const response = await axios.post(TAP_API_URL, payload, {
      headers: {
        'Authorization': `Bearer ${TAP_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Received response from Tap Payments:', response.data);

    return {
      statusCode: 200,
      body: JSON.stringify({
        payment: {
          transactionId: response.data.id,
          instructions: "",
          url: response.data.transaction.url
        }
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create payment', details: error.message })
    };
  }
};