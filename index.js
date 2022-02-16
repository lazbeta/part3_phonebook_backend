const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
morgan.token('body', (request) => JSON.stringify(request.body))
app.use(express.json())

const cors = require('cors')
app.use(cors())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>hello world!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const numberOfItems = persons.length

    response.json(`Phonebook has info of ${numberOfItems} people. ${new Date ()}`)
    
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

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 1000)
    }
  
    const noDuplicates = persons.find(p => p.name === body.name)

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'you must include name and number'
        })
    } else if (noDuplicates) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    } 


    persons = persons.concat(person)

    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id === id)

    response.status(204).end()
})

const PORT = process.env.PORT || 3001 
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})