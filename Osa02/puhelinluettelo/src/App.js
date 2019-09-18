import React, { useState } from 'react'

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


  const Person = ({person}) => {

    if(filterNames(person.name)){
      return(
        <div>
          <p>{person.name} {person.number}</p>
        </div>
      )
    }
    else{
      return null
    }
  }

  const Rows = ({persons}) => {
    return(
    persons.map(person => <Person key= {person.name} person={person} filter={filter}/>)
    )
  }

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

  const filterNames = (props) => {
    return(
      props.includes(filter)
    )

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with <input value={filter} onChange={handleFilterChange}/>
        </div>
      <h3>Add new number</h3>
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
      <h3>Numbers</h3>
      <ul>
        <Rows persons={persons}/>
      </ul>
    </div>
  )

}

export default App