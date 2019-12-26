
const mongoose = require("mongoose");
const chalk = require('chalk');
const dbUrl = process.env.DB_URL;
mongoose.Promise = global.Promise;

mongoose.set("useCreateIndex", true);

// Connecting to the database
mongoose
    .connect(
        dbUrl,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 2000,
            socketTimeoutMS: 2000,
            poolSize: 1 // doesn't matter
        }
    )
    .then(() => {
        console.log("%s Successfully connected to the database", chalk.green('✓'));
    })
    .catch(err => {
        console.log("Could not connect to the database", chalk.red(err.message));
        process.exit();
    });