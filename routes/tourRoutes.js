const express = require('express')
const tourController = require('../controllers/tourController');
const router = express.Router();

router.param('id', tourController.checkID)

router
.route('/')
.get(tourController.getAllTours)
.post(tourController.checkBody, tourController.createNewTour)

router 
.route('/:id')
.get(tourController.getTourByID)
.patch(tourController.updateATour)
.delete(tourController.deleteATour)

module.exports = router;