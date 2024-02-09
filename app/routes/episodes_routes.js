const express = require('express')
const passport = require('passport')
const Podcast = require('../models/podcast')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const podcast = require('../models/podcast')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// CREATE
// POST /episodes/5a7db6c74d55bc51bdf39793
router.post('/episodes/:podcastId', requireToken, removeBlanks, (req, res, next) => {
	req.body.podcast = req.user.id

    const episode = req.body.episode
    const podcastId = req.params.podcastId

	Podcast.findById(podcastId)
        .then(handle404)
		    .then((podcast) => {
                podcast.episodes.push(episode)
                return podcast.save()
		})
        .then(podcast => res.status(201).json({ podcast: podcast }))
		.catch(next)
})

// UPDATE
// PATCH /episodes/5a7db6c74d55bc51bdf39793/aasdf4345q3asdfa
router.patch('/episodes/:podcastId/:episodeId', requireToken, removeBlanks, (req, res, next) => {
    const { podcastId, episodeId } = req.params

	Podcast.findById(podcastId)
		.then(handle404)
		.then((podcast) => {
            const theEpisode = podcast.episodes.id(episodeId)
			requireOwnership(req, podcast)
            theEpisode.set(req.body.episode)
			return podcast.save()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// DESTROY
// DELETE /episodes/5a7db6c74d55bc51bdf39793/aasdf4345q3asd
router.delete('/episodes/:podcastId/:episodeId', requireToken, removeBlanks, (req, res, next) => {
    const { podcastId, episodeId } = req.params

	Podcast.findById(podcastId)
		.then(handle404)
		.then((podcast) => {
            const theEpisode = podcast.episodes.id(episodeId)
			requireOwnership(req, podcast)
            theEpisode.deleteOne()
			return podcast.save()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})
module.exports = router
