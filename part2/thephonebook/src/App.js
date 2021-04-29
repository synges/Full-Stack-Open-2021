import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './Filter'
import Form from './Form'
import Persons from './Persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ nameFilter, setnameFilter] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response =>{
      setPersons(response.data)})
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if(persons.find( person => person.name.toLowerCase() === newName.toLowerCase())){
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = { name: newName, number: newNumber}
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setnameFilter(event.target.value)
  }

  const personsToShow = nameFilter
  ? persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))
  : persons

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter nameFilter={nameFilter} handleFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
        <Form newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson}/>
      <h3>Numbers</h3>
        <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App