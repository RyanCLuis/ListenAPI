// makes initial seed data for podcasts, to make it easier to tests routes

const mongoose = require('mongoose')
const Podcast = require('./podcast')
const db = require('../../config/db')

const startPodcasts = [
    { 
        name: 'Joe Rogan', 
        description: 'Really funny dude, talks about a lot of theories and stuff', 
        thumbnail: "https://i.ytimg.com/vi/4r7wHMg5Yjg/maxresdefault.jpg", 
        tags: ['Bald', 'Male', 'theory'],
        type: 'Comedy',
        views: 1000000,
    },
    { 
        name: 'The Daily', 
        description: 'Talks about the news and stuff', 
        thumbnail: "https://i.ytimg.com/vi/6zXDo4dL7SU/maxresdefault.jpg",
        tags: ['Informative', 'Male'],
        type: 'News',
        views: 999,
    },
    { 
        name: 'The Joe Budden Podcast', 
        description: 'Talks about the music industry and stuff', 
        thumbnail: "https://i.ytimg.com/vi/2Y9t5wVr0RQ/maxresdefault.jpg", 
        tags: ['imformative', 'instamental'],
        type: 'Music',
        views: 22,
    },
]

mongoose.connect(db, {useNewUrlParser: true})
    .then(() => {
        Podcast.deleteMany({ owner: null })
            .then(deletedPodcast => {
                console.log('deleted podcasts in seed script: ', deletedPodcast)

                Podcast.create(startPodcasts)
                    .then(newPodcast => {
                        console.log('new podcast added to db: \n', newPodcast)
                        // VERY IMPORTANT
                        mongoose.connection.close() 
                    })
                    .catch(error => {
                        console.log('an error has occurred: \n', error)
        
                        mongoose.connection.close() 
                    })
            })
            .catch(error => {
                console.log('an error has occurred: \n', error)

                mongoose.connection.close() 
            })
    })
    .catch(error => {
        console.log('an error has occurred: \n', error)

        mongoose.connection.close() 
    })