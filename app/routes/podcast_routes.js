const express = require('express')
const passport = require('passport')
const Podcast = require('../models/podcast')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// INDEX
// GET /
router.get('/', (req, res, next) => {
	Podcast.find()
    .populate('owner')
		.then((podcasts) => {
			return podcasts.map((podcast) => podcast.toObject())
		})
		.then((podcasts) => res.status(200).json({ podcasts: podcasts }))
		.catch(next)
})


// SHOW
// GET /5a7db6c74d55bc51bdf39793
router.get('/:id', (req, res, next) => {
	Podcast.findById(req.params.id)
        .populate('owner')
		.then(handle404)
		.then((podcast) => res.status(200).json({ podcast: podcast.toObject() }))
		.catch(next)
})

// CREATE
// POST /
router.post('/', requireToken, (req, res, next) => {
	req.body.podcast.owner = req.user.id

	Podcast.create(req.body.podcast)
		.then((podcast) => {
			res.status(201).json({ podcast: podcast.toObject() })
		})
		.catch(next)
})

// UPDATE
// PATCH /5a7db6c74d55bc51bdf39793
router.patch('/:id', requireToken, removeBlanks, (req, res, next) => {
	delete req.body.podcast.owner

	Podcast.findById(req.params.id)
		.then(handle404)
		.then((podcast) => {
			requireOwnership(req, podcast)

			return podcast.updateOne(req.body.podcast)
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// DESTROY
// DELETE /5a7db6c74d55bc51bdf39793
router.delete('/:id', requireToken, (req, res, next) => {
	Podcast.findById(req.params.id)
		.then(handle404)
		.then((podcast) => {
			requireOwnership(req, podcast)
			podcast.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router
