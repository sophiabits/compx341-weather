const express = require('express');
const apiv1 = require('./apiv1');

const app = express();
app.use(apiv1.router);
app.listen(() => {
    console.log('Express API is listening.');
});
