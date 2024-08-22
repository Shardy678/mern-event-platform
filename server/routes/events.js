const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const auth = require('../middleware/auth');
const { validationResult, check } = require('express-validator');

router.get('/:id', async (req, res) => {
    const eventId = req.params.id;
    try {
        const event = await Event.findById(eventId);
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async (req,res) => {
    const eventId = req.params.id
    const { title, description, location } = req.body;
    try {
        const event = await Event.findByIdAndUpdate(
            eventId,
            { title, description, location },
            { new: true, runValidators: true }
        )
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


router.get('/', async (req, res) => {
    try {
        const events = await Event.find().populate('createdBy','name');
        console.log(`GET request received`)
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post(
    '/',
    [auth, [
        check('title', 'Title is required').not().isEmpty(),
        check('location', 'Location is required').not().isEmpty(),
        check('image', 'Image URL is required').not().isEmpty(), // Add validation for the image if necessary
    ]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { title, location, description, image } = req.body;

        try {
            const event = new Event({
                title,
                location,
                description,
                image,  // Ensure this field is correctly being saved
                createdBy: req.user.id
            });
            await event.save();
            res.status(201).json(event);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);


// DELETE an event
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Event.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
