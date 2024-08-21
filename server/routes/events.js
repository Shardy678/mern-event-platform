const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.get('/', async (req,res) => {
    try {
        const events = await Event.find()
        res.json(events)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/', async (req,res) => {
    const event = new Event({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
    })

    try {
        const newEvent = await event.save()
        res.status(201).json(newEvent)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

module.exports = router