const mongoose = require('mongoose');

const UserInputSchema = new mongoose.Schema({
    name: String, // Adding the user name field
    movieName: String,
    rating: Number,
    review: String
});

const UserInput = mongoose.model("user", UserInputSchema);

module.exports = UserInput;
