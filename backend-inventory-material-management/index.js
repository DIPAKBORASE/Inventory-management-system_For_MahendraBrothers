const express = require('express');
const dotenv = require('dotenv');

// var bodyParser = require('body-parser');
//Load env variables from our custom path
dotenv.config({ path: './config/config.env' });
const db = require('./models');
const { Router } = require('express');

//Middlewares
const errorHandler = require('./middleware/error');

//Routes files
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');

//Request logger
const morgan = require('morgan');

const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }))
//Routes
app.use('/api/auth', authRoute);
// app.use('/api/auth', protect, authorize('Admin'), userRoute);
app.use('/api/users', userRoute);

//Error Handler


db.sequelize
	.sync()
	.then(() => {
		const PORT = process.env.PORT || 5000;

		app.listen(PORT, () => {
			console.log(
				`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
			);
		});
	})
	.catch((err) => console.log(err));
