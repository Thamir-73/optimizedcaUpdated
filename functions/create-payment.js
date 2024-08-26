const axios = require('axios');

const TAP_API_KEY = process.env.TAP_API_KEY;
const SNIPCART_SECRET_KEY = process.env.SNIPCART_SECRET_KEY;
const TAP_API_URL = 'https://api.tap.company/v2/charges';

exports.handler = async function(event, context) {
  console.log('Received headers:', event.headers);
  console.log('Received body:', event.body);

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Verify the request is coming from Snipcart
  const token = event.headers['x-snipcart-requesttoken'];
  try {
    const verifyResponse = await axios.get(`https://app.snipcart.com/api/requestvalidation/${token}`, {
      headers: {
        'Authorization': `Basic ${Buffer.from(SNIPCART_SECRET_KEY).toString('base64')}`
      }
    });
    if (!verifyResponse.data.token) {
      console.error('Snipcart verification failed');
      return { statusCode: 401, body: 'Unauthorized' };
    }
    console.log('Snipcart verification successful');
  } catch (error) {
    console.error('Snipcart verification error:', error);
    return { statusCode: 401, body: 'Unauthorized' };
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