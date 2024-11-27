const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://duchoang1111204:3ZuslOmusdVb6L3P@cluster0.3kj3e.mongodb.net/TMDT_').then(() => console.log("DB Connected"));
}

module.exports = connectDB;
