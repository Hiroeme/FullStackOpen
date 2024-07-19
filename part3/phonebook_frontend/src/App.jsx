import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Person from './components/Person'
import personService from './services/persons'
import './index.css'

const Notification = ({ message, error }) => {
  if (message === null || message === '') {
    return null
  }

  if (error) {
    return (
      <div className='error'>
        {message}
      </div>
    )
  }

  return (
    <div className='success'>
      {message}
    </div>
  )

}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [screen, setFilter] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    console.log('effect')

    personService
      .getAll()
      .then(initialPersons =>
        setPersons(initialPersons)
      )
  },[])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newPhone,
      id: `${crypto.randomUUID()}`,
    }

    if (persons.find(person => person.name === newName)) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(persons.find(person => person.name === newName).id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson ))
          })
          .catch(error => {
            console.log(error.response.data.error)
            setError(true)
            setMessage(error.response.data.error)
          })
      }
      
    } else {

      
      personService
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewPhone('')
          setError(false)
          setMessage(`Added ${newPerson.name}`)
      })
      .catch(error => {
        console.log(error.response.data.error)
        setError(true)
        setMessage(error.response.data.error)
      })

      // setPersons(persons.concat(personObject))
      // setNewName('')
      // setNewPhone('')
    }
  }

  const deletion = (id, name) => {
      if(confirm(`Delete ${name}?`)) {
        // console.log("deleted!")
        personService
        .remove(id)
        .then((deletedPerson) => {
          console.log(`Deleted`, deletedPerson)
          setPersons(persons.filter(person => person.id !== id))
        })  
      }
  } 

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    console.log(event.target.value)
    setNewPhone(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handlers = {
    addPerson,
    handlePhoneChange,
    handlePersonChange,
  }

  const filteredBook = persons.filter(person => person.name.toLowerCase().includes(screen))
 

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error}/>
      <Filter handleFilterChange={handleFilterChange}/>

      <h2>add a new</h2>
      <PersonForm {...handlers} newName={newName} newPhone={newPhone}/>
      <h2>Numbers</h2>
      {filteredBook.map(person => 
        <Person key={person.name} 
                person={person}
                deletion={() => deletion(person.id, person.name)} />)}
    </div>
  )
}

export default App