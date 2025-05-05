const mongoose = require('mongoose');
const { dburl } = require('../config/dotenv');


const DB = () => {
    mongoose.connect(dburl)
        .then(() => {
            console.log('Connected successfully to the database');
        })
        .catch(err => {
            console.error('Error connecting to the database:', err);
        });
}

module.exports = DB;
