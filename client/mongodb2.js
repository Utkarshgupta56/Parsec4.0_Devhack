var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/eventinfo')
.then(()=>{
  console.log("Database connected");
})
.catch(()=>{
    console.log("failedd to connect")
})
mongoose.connection.on('error', err => { console.log(err); });
const regschema = new mongoose.Schema({
    name: String,
    ename: String,
    numbers: [Number],
  });

  const eventinfo = mongoose.model('eventinfo', regschema);

  module.exports=eventinfo