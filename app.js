const express = require('express');
const app = express();
const mongoose = require('mongoose');
const workoutRouter = require('./routes/workouts'); 
const path = require('path');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// MongoDB connection 
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://jordyalec:Jordytheboss1@cluster0.l4n3i.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('MongoDB connection error: ', err));

// Routes
app.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' });  
});


app.use('/workouts', workoutRouter);

// Start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
