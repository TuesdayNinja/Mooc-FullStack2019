import React, { useState } from 'react'


const Person = ({person}) => {
  return(
    <div>
      <p>{person.name} {person.number}</p>
    </div>
  )
}

const Rows = ({persons, filterNames}) => {
  return(
    persons.filter(filterNames).map(person =>
      <Person key= {person.name} person={person}/>)
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
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')



  const addName = (event) => {
     event.preventDefault()

     if(nameExist(event)){
        alert(`${newName} is already added to phonebook`)
      }
      else{
        const nameObject={
          name: newName,
          number: newNumber
         }

         setPersons(persons.concat(nameObject))
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
        <Rows persons={persons} filterNames={filterNames}/>
      </ul>
    </div>
  )

}

export default App