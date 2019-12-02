const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const {mongoDbUrl, port} = require('./config/configuration');
const hbs = require('express-handlebars');


// Initializations
const app = express();

// Configuring mongoose
mongoose.connect(mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(response => {
    console.log('Mongo DB Connected successfully');
}).catch(errors => {
    console.log('Database connection failed');
});

// Views
app.engine('.hbs', hbs({
    defaultLayout: 'default',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use('/', (req, res) => {
    res.send('Welcome to our node CMS streaming on Twitch');
})

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Server listening
app.listen(port, ()=> {
    console.log(`Server is listening on port ${port}`);
});