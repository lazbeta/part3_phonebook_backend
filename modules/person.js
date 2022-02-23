const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl)
    .then(result => {
        console.log('connecting to mongo!')
    })
    .catch((error) => {
        console.log('error connecting to Mongo', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [3, 'Must be at least 3 charachters long'],
        required: true,
        unique: true
    },
    number: {
        type: String, 
        minlength: [8, ' Must be at least 8 charachters long'],
        required: true
    }

})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

personSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', personSchema)
