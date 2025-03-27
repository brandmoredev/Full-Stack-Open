const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('password')
  process.exit(1)
}

if (process.argv.length === 4) {
  console.log('provide the person\'s number')
  process.exit(1)
}


const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]

// const persons = [
//   {
//     'name': 'Arto Hellas',
//     'number': '040-123457',
//     'id': '1'
//   },
//   {
//     'name': 'Ada Lovelace',
//     'number': '39-44-5323523',
//     'id': '2'
//   },
//   {
//     'name': 'Dan Abramov',
//     'number': '12-43-234345',
//     'id': '3'
//   }
// ]

const url = `mongodb+srv://fullstackopen:${password}@cluster0.kllpipo.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const phonebookSchema = mongoose.Schema({
  name: String,
  number: String
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

//RUN ONCE
// Phonebook.insertMany(persons).then(() => {
//   console.log("Successfully added data.")
//   mongoose.connection.close()
// })


// DISPLAYS ALL DATA WHEN ONLY PASSWORD IS PROVIDED ON ARGV
if (process.argv.length === 3) {
  Phonebook.find({}).then(result => {
    console.log('phonebook:')

    console.log('TEST', result)
    result.forEach(phonebook => {
      console.log(phonebook.name, phonebook.number)
    })
    mongoose.connection.close()
  })
}

// SAVE NEE DATA IF NAME AND NUMBER ARE PROVIDED AS ARGVS
if (process.argv.length === 5 ) {
  const phonebook = new Phonebook({
    name: personName,
    number: personNumber
  })
  
  phonebook.save().then(() => {
    console.log(`added ${personName} ${personNumber} to phonebook`)
    
    mongoose.connection.close()
  })
}
