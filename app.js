// app.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// const productRouter = require('./routes/routes');
const router = require('./routes/routes');

const app = express();

// Set up mongoose connection

const mongoDB = "mongodb+srv://dipakforofficework:iMSkJXNqbt0GD2w0@cluster0.klpjm9q.mongodb.net/-test"
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router);

const port = 8080;

db.once('open', function () {
    console.log('Connected!');
    app.listen(port, () => {
        console.log('Server is up and running on port numner ' + port);
    });
});