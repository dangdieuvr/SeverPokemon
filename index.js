// make bluebird default Promise
const express = require('express');
const app = express();
const mongoose = require('./src/config/mongoose');
const registerRouter = require('./src/api/routes/auth.route');
const anchorRouter = require('./src/api/routes/anchor.route');
const petRouter = require('./src/api/routes/pets.route');
const userRouter = require('./src/api/routes/user.route');

const PORT = 3000;
// open mongoose connection
mongoose.connect();

// Middleware
app.use(express.json());

// Routes
app.use('/', registerRouter);
app.use('/', anchorRouter);
app.use('/', petRouter);
app.use('/', userRouter);

// listen to requests
app.listen(PORT || process.env.PORT, () =>
	console.log(`Example app listening on port ${PORT}`)
);

module.exports = app;
