import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')

  const Person = ({person}) => {
    return(
      <div>
        <p>{person.name}</p>
      </div>
    )
  }

  const Rows = ({persons}) => {
    return(
    persons.map(person => <Person key= {person.name} person={person}/>)
    )
  }

  const addName = (event) => {
     event.preventDefault()
     console.log(nameExist(event))

     if(!nameExist(event)){

         const nameObject={
          name: newName
         }

         setPersons(persons.concat(nameObject))
         setNewName('')
      }
      else{
        alert(`${newName} is already added to phonebook`)
      }
  }

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const nameExist = (event) => {
    return(
    persons.some(person => person.name === newName)
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        <Rows persons={persons}/>
      </ul>
    </div>
  )

}

export default App