// mongodb2.js
const mongoose = require('mongoose');

// Check if the model already exists before creating it
const Events = mongoose.models.even || mongoose.model('even', new mongoose.Schema({
    organizer: String,
    rollno: String,
    ename: String,
}));

mongoose.connect('mongodb://127.0.0.1:27017/eventinfo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Eventinfo Database connected");
    })
    .catch(() => {
        console.log("Failed to connect to Eventinfo Database");
    });

module.exports = Events;
