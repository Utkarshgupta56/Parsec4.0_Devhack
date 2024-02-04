// mongodb.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/IDs', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("IDs Database connected");
    })
    .catch(() => {
        console.log("Failed to connect to IDs Database");
    });

const Logins = new mongoose.Schema({
    name: String,
    rollno: String,
    email: String,
    pass: String,
    cpass: String,
    organizer:String,
    event:String,
    eventn:Number,
});

const IDs = mongoose.model('Id', Logins);

module.exports = IDs;
