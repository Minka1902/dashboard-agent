const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require("cors");
const { errors } = require('celebrate');
const fs = require('fs');
const { unregister } = require('scharff');
if (process.platform === 'win32') {
    console.log("Path to config: " + path.join(__dirname, './config.json'));
    var config = JSON.parse(fs.readFileSync(path.join(__dirname, './config.json'), 'utf8'));
} else {
    console.log("Path to config: " + path.join(process.execPath, '../config.json'));
    var config = JSON.parse(fs.readFileSync(path.join(process.execPath, '../config.json'), 'utf8'));
}
const app = express();

require('dotenv').config();

// include these before other routes
app.options('*', cors());
app.use(cors());

app.use(bodyParser.json()); // parse application/json

const { updateMemory, createServerEntry, checkWebsite, createResource } = require('./controllers/sources');

for (let i = 0; i < config.length; i++) {
    createResource(config[i]);

    // ! every hour the server will check the source and add an entry to the source collection
    setInterval(() => {
        if (config[i].isMemoryCheck || false) {
            createServerEntry(config[i].pathToDisk, config[i]);
        } else {
            checkWebsite(config[i], true);
        }
    }, (config[i].secondsToUpdateResources * 1000));

    // ! every 20 seconds the server will check the source
    setInterval(() => {
        if (config[i].isMemoryCheck || false) {
            updateMemory(config[i].pathToDisk, config[i]);
        } else {
            checkWebsite(config[i]);
        }
    }, (config[i].secondsToCheckResources * 1000));
}
app.use(errors());      // celebrate error handler

console.log('App is running correctly');
