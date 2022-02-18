require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
morgan.token('body', (request) => JSON.stringify(request.body))
app.use(express.json())

const Person = require('./modules/person')

const cors = require('cors')
app.use(cors())    

app.use(express.static('build'))

app.get('/', (request, response) => {
    response.send('<h1>hello world!</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        response.json(`Phonebook has info of ${persons.length} people. ${new Date ()}`)
    })
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
        return response.json(person)
    } else {
        response.status(404).end()
    }
})

app.post ('/api/persons', (request, response) => {
    const body = request.body

    const person = new Person ({
        name: body.name,
        number: body.number,
    })
  
    /*  const noDuplicates = persons.find(p => p.name === body.name)
    else if (noDuplicates) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    } */

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'you must include name and number'
        })
    }
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id).then(result=> {
        response.status(204).end()
    })
    .catch(error => next(error))
    
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})