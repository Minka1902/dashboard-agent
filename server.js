const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const { errors } = require('celebrate');
const { networkInterfaces } = require('os');
const config = require('./config');
const { unregister } = require('scharff');

const app = express();

require('dotenv').config();

// include these before other routes
app.options('*', cors());
app.use(cors());

app.use(bodyParser.json()); // parse application/json

const { updateMemory, createServerEntry, checkWebsite } = require('./controllers/sources');

const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

let newName = '';

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
        const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
        if (net.family === familyV4Value && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
            newName = name;
        }
    }
}

// ! every hour the server will check the source and add an entry to the source collection
// ! checks the server it runs on
setInterval(() => {
    if (config.isMemoryCheck) {
        const ip = results[newName][0];
        createServerEntry(config.pathToDisk, ip);
    }
}, (3600 * 1000));

// ! every 15 seconds the server will check the source
setInterval(() => {
    if (config.isMemoryCheck) {
        const ip = results[newName][0];
        updateMemory(config.pathToDisk, ip);
    }
}, (20 * 1000));

// ! every half hour the server will check the source and add an entry to the source collection
// ! checks the websites config contains
setInterval(() => {
    if (config.websitesToCheck.length !== 0) {
        for (let i = 0; i < config.websitesToCheck.length; i++) {
            checkWebsite(config.websitesToCheck[i], true);
        }
    }
}, (1800 * 1000));

setInterval(() => {
    if (config.websitesToCheck.length !== 0) {
        for (let i = 0; i < config.websitesToCheck.length; i++) {
            checkWebsite(config.websitesToCheck[i]);
        }
    }
}, (20 * 1000));

app.use(errors());      // celebrate error handler

app.listen(config.PORT, function () {
    console.log(`App is running on port ${config.PORT}`);
});
