const mongoose = require('mongoose')

const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl)
    .then(result => {
        console.log('connecting to mongo!')
    })
    .catch((error) => {
        console.log('error connecting to Mongo', error.message)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})


personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)


/*if (process.argv.length === 3){
    Person.find({}).then(result => {
        console.log("Phonebook:")
        result.forEach(person => {
        console.log(person.name, " ", person.number)
        })
        mongoose.connection.close()
    })
}
 else if(process.argv.length === 5){
        const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
        })
        person.save().then(response => {
        console.log(` ${process.argv[3]} was added to the phonebook`)
        mongoose.connection.close()
        })
        } */