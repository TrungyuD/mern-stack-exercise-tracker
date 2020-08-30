const router = require('express').Router();
const Exercise = require('../models/exercise.model');

router.route('/').get((req,res) => {
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: '+ err))
});

router.route('/add').post((req,res) => {
    const {username, description} = req.body;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });

    newExercise.save()
    .then(()=> res.json('Exer added!'))
    .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;