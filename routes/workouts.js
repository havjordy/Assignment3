const express = require('express');
const router = express.Router();
const Workout = require('../models/workout');

// Route to show the form to add a new workout
router.get('/add', (req, res) => {
    res.render('addWorkout', { title: 'Add Workout' });
});

// Route to handle the form submission for adding a new workout
router.post('/add', async (req, res) => {
    const { workoutDate, calories, distance, bpm, objectiveMet } = req.body;
    try {
        const newWorkout = new Workout({
            workoutDate,
            calories,
            distance,
            bpm,
            objectiveMet: objectiveMet === 'true' 
        });
        await newWorkout.save();
        res.redirect('/workouts');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route to show user all workouts
router.get('/', async (req, res) => {
    try {
        const workouts = await Workout.find();
        res.render('workoutList', { title: 'Your Workouts', workouts });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route to show the form to edit a workout
router.get('/edit/:id', async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout) {
            return res.status(404).send('Workout not found');
        }
        res.render('editWorkout', { title: 'Edit Workout', workout });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route to handle the form submission for editing a workout
router.post('/edit/:id', async (req, res) => {
    const { workoutDate, calories, distance, bpm, objectiveMet } = req.body;
    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, {
            workoutDate,
            calories,
            distance,
            bpm,
            objectiveMet: objectiveMet === 'true' 
        }, { new: true });

        if (!updatedWorkout) {
            return res.status(404).send('Workout not found');
        }

        res.redirect('/workouts');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route to delete a workout
router.get('/delete/:id', async (req, res) => {
    try {
        const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);
        if (!deletedWorkout) {
            return res.status(404).send('Workout not found');
        }
        res.redirect('/workouts');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
