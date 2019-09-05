const express = require('express');
const router = express.Router();
const Actor = require('../model/actors');

//get - show
router.get('/', (req, res) => {
    Actor.find().then(actor => {
        res.send(actor)
    }).catch(err => {
        res.send(err);
    })
});

//post - create
router.post('/', (req, res) => {
    let data = req.body;
    let actor = new Actor(data)
    actor.save().then(actor => {
        res.send(actor)
    }).catch(err => {
        res.send(err)
    })
});

module.exports = router;