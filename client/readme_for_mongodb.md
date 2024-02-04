
## Installation of  MongoDB:

1. Download MongoDB from the official website: `MongoDB Download Center`.

2. Start `MongoDB` by running the mongod command in the terminal.

3. Write this code in your teriminal `npm install mongoose`

**TO CONNECT MongoDB TO Mongoose**:

* In your Node.js project, create a file (e.g., app.js or index.js) and set up a connection to MongoDB using Mongoose. Replace the connection URL with your MongoDB server details.

```
const mongoose = require('mongoose');

// Replace 'your-connection-string' with your actual MongoDB connection string
const mongoURI = 'your-connection-string';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

```

***Note***: If you are using MongoDB Atlas, you can find your connection string in the MongoDB Atlas dashboard.


**Define a Mongoose Schema and Model:**:

* You can define Mongoose schemas and models to structure your  data. 

```
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model('User', userSchema);

//example
const newUser = new User({
  name: 'John Doe',
  email: 'john@example.com',
  age: 25,
});

newUser.save((err, savedUser) => {
  if (err) return console.error(err);
  console.log('User saved:', savedUser);
});

```

* **To run the app**

`node app.js`



**THESE ARE ONLY FOR THE HELP** PLEASE DON'T FOLLOW IT COMPLETELY.


