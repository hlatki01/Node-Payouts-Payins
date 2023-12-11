const express = require('express');
const payoutsRoute = require('./routes/payouts');
const payinsRoute = require('./routes/payins');
const payinsCertificateAuthRoute = require('./routes/payins-certificate-auth');
const payinsCertificateAuthRouteGetPaymentMethods = require('./routes/payins-certificate-auth-get-payments');
const notificationsRoute = require('./routes/notifications');

const app = express();
const PORT = 3000; // or any port you prefer

// Middleware to parse JSON in request bodies
app.use(express.json());

// Use the routes
app.use('/payouts', payoutsRoute);
app.use('/payins', payinsRoute);
app.use('/payins-certificate-auth-get-payments', payinsCertificateAuthRouteGetPaymentMethods);
app.use('/payins-certificate-auth', payinsCertificateAuthRoute);
app.use('/notifications', notificationsRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
