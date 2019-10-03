import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './App.css'


const Person = ({person, handleDelete}) => {
  return(
    <div>
      <p>{person.name} {person.number} <button onClick={() => handleDelete(person)}>delete</button> </p>
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


const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }
  else if (isError) {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  else {
    return (
      <div className="success">
        {message}
      </div>
    )
  }
}


const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ isError, setIsError ] = useState(false)


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

     if(nameExist()){
        update(nameObject)
      }
      else{
         personService
          .create(nameObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            handleNotification(`${newName} added to phonebook`)
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

  const nameExist = () => {
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

  const handleDelete = (person) => {
    const personId = person.id
    if (window.confirm(`Are you sure to delete ${person.name}`)){
      personService
            .deletePerson(personId)
            .then(deleted => {
              setPersons(persons.filter(person => person.id !== personId))
              handleNotification(`${person.name} deleted from phonebook.`)
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
          handleNotification(`${newName}'s number changed`)
        })
        .catch(error => {
          handleError(`${newName} was already removed from server`)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleNotification = (message) => {
    setNotificationMessage(`${message}`)
    setIsError(false)
      setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

   const handleError = (message) => {
    setNotificationMessage(`${message}`)
    setIsError(true)
      setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }




  return (
    <div className='App'>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} isError={isError}/>
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