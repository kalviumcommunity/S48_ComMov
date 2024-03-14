const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    director: String,
    rating: Number
});

const MovieModel = mongoose.model('Movie', MovieSchema);

module.exports = MovieModel;
