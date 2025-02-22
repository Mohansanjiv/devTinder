const mongoose = require("mongoose");

const connectDB = async () => {
        await mongoose.connect('mongodb+srv://choudharysanjivkumar5:0zY53CT5Hz1jfsNY@cluster0.jbqu5.mongodb.net/devtinder'); 
};

module.exports = connectDB;

