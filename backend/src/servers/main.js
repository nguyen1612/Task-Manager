const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Routers
const user = require('../routes/user');

app.use('/users', user);

module.exports = app;