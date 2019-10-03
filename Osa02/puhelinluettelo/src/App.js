import React, { useState, useEffect } from 'react'
import personService from './services/persons'


const Person = ({person, handleDelete}) => {
  return(
    <div>
      <p>{person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button> </p>
    </div>
  )
}


const Rows = ({persons, filterNames, handleDelete}) => {
  return(
    persons.filter(filterNames).map(person =>
      <Person key= {person.name} person={person} handleDelete={handleDelete}/>)
  )
}

const PersonForm = ({newName, newNumber, addName, handleNameChange, handleNumberChange}) => {
  return(
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const FilterInput = ({filter, handleFilterChange}) => {
  return(
    <div>
          filter shown with <input value={filter} onChange={handleFilterChange}/>
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])



  const addName = (event) => {
     event.preventDefault()

     const nameObject={
          name: newName,
          number: newNumber
         }

     if(nameExist(event)){
        update(nameObject)
      }
      else{
         personService
          .create(nameObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
          })

      }

      setNewName('')
      setNewNumber('')
  }

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }

  const nameExist = (event) => {
    return(
    persons.some(person => person.name === newName)
    )
  }

  const handleFilterChange = (event) => {
      setFilter(event.target.value)
  }

  const filterNames = (person) => {
    return(
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
  }

  const handleDelete = (personId) => {
    if (window.confirm('Are you sure?')){
      personService
            .deletePerson(personId)
            .then(deleted => {
              setPersons(persons.filter(person => person.id !== personId))
            })
    }
  }

  const update = (nameObject) => {
    if(window.confirm(`${newName} is already added to phonebook. Do you want to change the number?`)){
      const id = persons.find(person => person.name === newName).id
      console.log(id)
      personService
        .update(id, nameObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        })
    }
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <FilterInput filter={filter} handleFilterChange={handleFilterChange}/>
      <h3>Add new number</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        addName={addName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <ul>
        <Rows
          persons={persons}
          filterNames={filterNames}
          handleDelete={handleDelete}/>
      </ul>
    </div>
  )

}

export default App