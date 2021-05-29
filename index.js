const express = require('express');
const mongoose = require('mongoose');
const bodyParser =  require('body-parser');
let aboutRoutes = require('./routes/aboutRoutes');
let userRoutes = require('./routes/userRoutes');
require('dotenv/config');

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

//API routes
app.use('/user', userRoutes);
app.use('/about', aboutRoutes);

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}
//connect to the database
const {DATABASE_URL, PORT} = process.env

// db connect
mongoose.connect(DATABASE_URL, options, ()=>{
    //listening to the server
    app.listen(PORT || 4000, function(){
        console.log('now listening for requests');
    });
});



