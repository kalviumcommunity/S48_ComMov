const mongoose = require('mongoose');

const UserInputSchema = new mongoose.Schema({
    movieName: String,
    rating: Number,
    review: String
});

const UserInput = mongoose.model("user", UserInputSchema);

module.exports = UserInput;
