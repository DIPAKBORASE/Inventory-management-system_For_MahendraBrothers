const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

const {
	addLocation,
	updateLocation,
	getLocation,
	getLocations,
	deleteLocation,
	getAllLocation,
	getLocationsExport,
} = require('../controllers/location');

const location_valid = require('../validations/location_validator');

router
	.post(
		'/getLocation',
		location_valid.idValid(),
		protect,
		authorize(process.env.SYSTEM_ADMIN),
		getLocation
	)
	.post(
		'/getLocations',
		protect,
		authorize(process.env.SYSTEM_ADMIN),
		getLocations
	)
	.post(
		'/getLocationsExport',
		protect,
		authorize(process.env.SYSTEM_ADMIN),
		getLocationsExport
	)
	.post('/getAllLocation', getAllLocation)
	.post(
		'/updateLocation',
		location_valid.updateValid(),
		protect,
		authorize(process.env.SYSTEM_ADMIN),
		updateLocation
	)
	.post(
		'/deleteLocation',
		location_valid.idValid(),
		protect,
		authorize(process.env.SYSTEM_ADMIN),
		deleteLocation
	)
	.post(
		'/addLocation',
		location_valid.saveValid(),
		protect,
		authorize(process.env.SYSTEM_ADMIN),
		addLocation
	);

module.exports = router;
