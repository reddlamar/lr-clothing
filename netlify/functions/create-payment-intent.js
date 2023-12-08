require('dotenv').config();
const stripe = require('stripe')(
	`sk_test_51OKwG3LrBpCjKrd3azVfyiyBGP5VgVlbMhYH31xqfrV5Uibky8g9d6qcJAzuSWsdLvQY5fVETOCRE3tM4yOmSnzt00zvO2SL7i`
);

exports.handler = async (event) => {
	try {
		const { amount } = JSON.parse(event.body);

		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			currency: 'usd',
			payment_method_types: ['card'],
		});

		return {
			statusCode: 200,
			body: JSON.stringify({ paymentIntent }),
		};
	} catch (error) {
		console.log(error);

		return {
			status: 400,
			body: JSON.stringify({ error }),
		};
	}
};
