const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    workoutDate: { type: Date, required: true },  // Ensure it's included here
    calories: { type: Number, required: true },
    distance: { type: Number, required: true },
    bpm: { type: Number, required: true },
    objectiveMet: { type: Boolean, required: true },
});

module.exports = mongoose.model('Workout', workoutSchema);
