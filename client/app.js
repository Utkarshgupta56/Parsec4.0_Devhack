const express = require("express");
const mongoose=require("mongoose");
const path = require("path");
const bodyparser=require("body-parser");
const app = express();
const port = 80;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');
main().catch(err=>console.log(err));
async function main(){
mongoose.connect('mongodb://127.0.0.1:27017/IDs',{useNewUrlParser: true, useUnifiedTopology: true});
// For serving static files
app.use('/static', express.static('static'))


// Set the views directory
app.set('views', path.join(__dirname, 'views'))
app.get('/slogin', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views', 'slogin.html'));
});

app.get('/ilogin', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views', 'ilogin.html'));
});

app.get('/signup', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views', 'signup.html'));
});

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views', 'first.html'));
});
app.get('/certificate', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views', 'certificate.html'));
});
app.get('/inst', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views', 'inst.html'));
});
app.get('/sdash', async (req, res) => {
    try {
        const name = req.query.name;
        const rollno = req.query.rollno;

        // Fetch events with eventn = 1 from the database
        const events = await IDs.find({ eventn: 1 });

        // Render the student_dash.pug template and pass events data
        res.render('student_das.pug', { name, rollno, events });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
    // console.log("We are connected...");
});
var Logins = new mongoose.Schema({
    name:String,
    rollno:String,
    email:String,
    pass:String,
    cpass:String,
    organizer:String,
    event:String,
    eventn:Number,
})
var IDs = mongoose.model('Id',Logins);
app.post('/signup', async (req, res) => {
    const email = req.body.email;

    const existingUser = await IDs.findOne({ email: email });
    if (existingUser) {
        // User with the same email already exists
        const params = {
            error: 'Email ID already registered',
        };
        res.status(200).sendFile(path.join(__dirname, 'views', 'signup.html'));
    } else {
        const newUser = new IDs({
            name:req.body.name,
            rollno:req.body.rollno,
            email: email,
            pass: req.body.password,
        });
        
        await newUser.save();
        if(newUser.email==="iic@iitdh.ac.in"){
            res.status(200).sendFile(path.join(__dirname, 'views', 'inst.html'));
        }else{
        res.redirect(`/sdash?name=${encodeURIComponent(req.body.name)}&rollno=${encodeURIComponent(req.body.rollno)}`);
        }
    }
})
app.post('/certificate', async (req, res) => {

        const newUser = new IDs({
            organizer:req.body.organizer,
            rollno:req.body.rollno,
            event: req.body.event,
            eventn:1
        });
        
        await newUser.save();
        
        res.status(200).sendFile(path.join(__dirname, 'views', 'inst.html'));
        
        
        
});
app.post('/slogin', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await IDs.findOne({ email: email, pass: password });
        if (user) {
            // User is registered and credentials match
            res.redirect(`/sdash?name=${encodeURIComponent(user.name)}&rollno=${encodeURIComponent(user.rollno)}`);
        } else {
            // User is not registered or credentials do not match
            res.status(200).sendFile(path.join(__dirname, 'views', 'slogin.html'));
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
app.post('/ilogin', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await IDs.findOne({ email: email, pass: password });
        if (user && user.email==="iic@iitdh.ac.in" ) {
            // User is registered and credentials match
            res.status(200).sendFile(path.join(__dirname, 'views', 'inst.html'));
        } else {
            // User is not registered or credentials do not match
            res.status(200).sendFile(path.join(__dirname, 'views', 'ilogin.html'));
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(port,()=>{
    console.log(`Server has started on port : ${port}`);
})
}