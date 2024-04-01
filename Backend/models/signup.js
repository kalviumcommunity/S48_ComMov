// signup.js
const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String
});

const SignupModel = mongoose.model('signup', signupSchema);

module.exports = SignupModel;
