const express = require("express");
const router = express.Router();
const Alerts = require('../models/schemas.js')

/*
router.get('/addAlert', async(req, res) => {
    const alert = {
        "text": "Road closed",
        "alertLevel": 2,
        "location": {
            "type": "Point",
            "coordinates": [
                40.85631,
                14.24641
            ]
        }
    }
    const newAlert = new Alerts;
    try {
        await newAlert.save(async(err, newAlertResult) => {
            console.log('new Alert added to db!');
            res.end('new Alert added to db!');
        })
    } catch(err){
        console.log('error adding alert!');
        res.end('error adding alert!');
    }
})
*/

router.get('/addAlert', async(req, res) => {
    
    const newAlert = new Alerts({
            text: "Road closed",
            alertLevel: 2,
            location: {
                type: "Point",
                coordinates: [
                    40.85631,
                    14.24641
                ]
            },
    });
    try {
        await newAlert.save(async(err, newAlertResult) => {
            console.log('new Alert added to db!');
            res.end('new Alert added to db!');
        })
    } catch(err){
        console.log('error adding alert!');
        res.end('error adding alert!');
    }
})

router.get('/getAlert', async(req, res) => {
    Alerts.find()
    .then(foundAlerts => res.json(foundAlerts))
})

module.exports = router;