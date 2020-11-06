const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PostRoutes = require('./routes/posts');

const app = express();
// Login Muhammadumar
// JoquTpT6aAyyTqPa
mongoose.connect("mongodb+srv://Muhammadumar:JoquTpT6aAyyTqPa@cluster0.5n0fu.mongodb.net/meancourse?retryWrites=true&w=majority",
    { useNewUrlParser: true }, { useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database!')
    })
    .catch((err) => {
        console.log(err);
    })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH , PUT, DELETE, OPTIONS')
    next();
});

app.use('/api/posts',PostRoutes);


module.exports = app;