require('dotenv').config()

const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.static('dist'));
app.use(express.json());
app.use(morgan('tiny'));

const { default: next } = require('next');
const Phonebook = require('./models/phonebook');

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
  Phonebook.find({}).then(persons => {
    response.json(persons)
  })
})

// GET PHONEBOOK INFO
app.get('/info', (request, response) => {
  Phonebook.countDocuments({})
    .then(count => {
      const date = new Date();
      response.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`);
    })

})

// GET PHONEBOOK ENTRY BY ID
app.get('/api/persons/:id', (request, response, next) => {
  const id =  request.params.id;

  Phonebook.findById(id)
    .then(person => {
      if (!person) {
        response.status(404).end();
      }

      response.json(person);
    })
    .catch(error => next(error))
})

// DELETE PHONEBOOK ENTRY BY ID
app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;

  Phonebook.findByIdAndDelete(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


// POST NEW PHONEBOOK ENTRY
const generateId = () => {
  return Math.floor(Math.random() * 1000000000);
}

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  Phonebook.findOneAndUpdate(
    { name },
    {
      $set: {
        name,
        number
      }
    },
    { runValidators: true, context: 'query' },
    { new: true, upsert: true}
  )
  .then(result => {
    return response.json(result)
  })
  .catch(error => next(error))

  // if (name && Phonebook.find(person => person.name.toLocaleLowerCase() === body.name.toLocaleLowerCase())) {
  //   return response.status(400).json({
  //     error: 'name must be unique'
  //   })
  // }
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint"})
}

app.use(unknownEndpoint)

//error handler middleware
const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if(error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted ID'})
  } else if (error.name === 'ValidationError') {
    return response.status(404).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)
