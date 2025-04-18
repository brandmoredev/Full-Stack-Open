const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(morgan('tiny'));

let phonebook = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

// LOGGER MIDDLEWARE - CUSTOM TOKEN
morgan.token('post-data', (request, response) => {
  const method = request.method;

  if (method === 'POST') {
    return JSON.stringify(request.body)
  }
  return
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'));

// GET ALL PERSONS
app.get('/api/persons', (request, response) => {
  console.log('GET request received');
  response.json(phonebook);
})

// GET PHONEBOOK INFO
app.get('/info', (request, response) => {
  const count = phonebook.length;
  const date = new Date();

  response.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`);
})

// GET PHONEBOOK ENTRY BY ID
app.get('/api/persons/:id', (request, response) => {
  const id =  request.params.id;

  const person = phonebook.find(person => person.id === id);

  if (!person) {
    response.status(404).end();
  }

  response.json(person);
})

// DELETE PHONEBOOK ENTRY BY ID
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;

  phonebook = phonebook.filter(person => person.id !== id);

  response.status(204).end();
})


// POST NEW PHONEBOOK ENTRY
const generateId = () => {
  return Math.floor(Math.random() * 1000000000);
}

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  if (body.name && phonebook.find(person => person.name.toLocaleLowerCase() === body.name.toLocaleLowerCase())) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  phonebook = phonebook.concat(person)

  response.json(person);
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
