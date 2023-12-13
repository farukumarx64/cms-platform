import axios from 'axios';

const elasticEmailApiKey = process.env.ELASTIC_EMAIL_KEY;

export default async function sendVerificationEmail(email, complainTicket) {
  const apiUrl = 'https://api.elasticemail.com/v2/email/send';

  const params = {
    apiKey: elasticEmailApiKey,
    from: 'faruku777@gmail.com',
    to: email, 
    subject: 'Verification Email',
    bodyHtml: `<p>You have submitted a complain to the Nigerian Midstream and Downstream Petroleum Regulatory Authority (NMDPRA). Your complain ticket is ${complainTicket}. Please use it to keep track of your complain on the platform. <br>Thank You!</p>`,

  };

  const data = '';

  try {
    const response = await axios.post(apiUrl, data, { params });
    console.log('Email sent:', response.data);
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
}
