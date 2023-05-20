const mongoose = require('mongoose');
require("dotenv").config();

const connectDB = mongoose.connect(process.env.DATABESE_URL);

module.exports = connectDB;