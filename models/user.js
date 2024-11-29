const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    carData: { type: Object, default: {} }

}, { minimize: false })


const userModel = mongoose.model.user || mongoose.model("user", userSchema);

module.exports = userModel