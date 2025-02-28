const express = require('express');
const app = express();
app.use(express.json());

const phonebook = [
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
