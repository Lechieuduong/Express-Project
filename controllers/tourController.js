
const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
    console.log(`Tour id is: ${val}`);
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    next();
}

exports.checkBody = (req, res, next) => {
    if(!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            messsage: 'Missing name or price'
        })
    }
    next();
}

exports.getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        result: tours.length,
        data: {
            tours
        }
    })
}

exports.getTourByID = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id)
    
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {
            tours: tour
        }
    })
}

exports.createNewTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);
    
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, 
    JSON.stringify(tours), 
    err => {
        res.status(201).json({
            status: 'success',
            data: {
                tours: newTour
            }
        })
    })
} 

exports.updateATour = (req, res) => {
    res.status(200).json({
        status: 'Success',
        data: {
            tour: '<Update tours here>'
        }
    })
}

exports.deleteATour = (req, res) => {
    res.status(204).json({
        status: 'Success',
        data: null
    })
}
