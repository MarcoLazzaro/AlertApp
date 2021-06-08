const express = require("express");
const router = express.Router();
const Alerts = require('../models/schemas.js')


//Submits new alert to the MongoDB collection. (Just for test and debugging)
router.get('/addAlert', async(req, res) => {
    const newAlert = new Alerts({
            text: "Road closed",
            alertLevel: 1,
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

//Submits new alert to the MongoDB collection. Uses data recived from the frontend
router.post('/addAlertToApi', async(req, res) => {
    const Data = req.body
    
    console.log(Data)
    const newAlert = new Alerts({
        text: Data.text,
        alertLevel: Data.alertLevel,
        location: Data.location
});
    try {
        await newAlert.save(async(err, newAlertResult) => {
            console.log('new Alert added to db from frontend!');
            res.end('new Alert added to db from frontend!');
        })
    } catch(err){
        console.log(err);
        res.end('error adding alert from frontend!');

    }
})

//Gets the alert collection data from MongoDB
router.get('/getAlert', async(req, res) => {
    Alerts.find()
    .then(foundAlerts => res.json(foundAlerts))
    //console.log(req.query.coords)  //coordinated from forntend for spatial queries
})

module.exports = router;