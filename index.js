const express = require('express');
const mongoose = require('mongoose');
const bodyParser =  require('body-parser');
let userRoutes = require('./routes/userRoutes');
let blogRoutes = require('./routes/blogRoutes');
let projectRoutes = require('./routes/projectRoutes');
const cors = require('cors')
require('dotenv/config');

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(cors())

//API routes
app.use('/user', userRoutes);
// app.use('/about', aboutRoutes);
app.use('/blogs', blogRoutes);
app.use('/projects', projectRoutes);

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



