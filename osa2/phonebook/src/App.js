import React from 'react'
import Persons from './components/Persons'
import Input from './components/Input'
import personService from './services/persons'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      notification: null,
    }
  }

  componentWillMount() {
    personService
      .getAll()
      .then(persons => {
        this.setState( { persons })
      })
  }

  addPerson = (event) => {
    event.preventDefault()
    const name = this.state.newName
    const number = this.state.newNumber
    const person = this.state.persons.find(p => p.name === name)

    if (person) {
      this.updatePerson(person, number)
    } else {
      personService
        .create({ name, number })
        .then(newPerson => {
          this.setState({
            persons: this.state.persons.concat(newPerson),
            newName: '',
            newNumber: '',
            notification: `lisättiin ${name}`,
          })
          setTimeout(() => {
            this.setState({ notification: null })
          }, 5000)
        })
    }
  }

  deletePerson = (person) => () => {
    if (window.confirm(`poistetaanko ${person.name}`)) {
      personService
        .remove(person.id)
        .then(response => {
          this.setState({
            persons: this.state.persons.filter(p => p.id !== person.id),
            notification: `poistettiin ${person.name}`,
          })
          setTimeout(() => {
            this.setState({ notification: null })
          }, 5000)
        })   
    }
  }

  updatePerson = (person, number) => {
    if (window.confirm(`${person.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
      const changedPerson = { ...person, number }
      
      personService
        .update(person.id, changedPerson)
        .then(updatedPerson => {
          this.setState({
            persons: this.state.persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson),
            newName: '',
            newNumber: '',
            notification: `muokattiin henkilön ${updatedPerson.name} numeroa`,
          })
          setTimeout(() => {
            this.setState({ notification: null })
          }, 5000)
        })
        .catch(error => {
          alert(`'${person.name}' on jo valitettavasti poistettu palvelimelta`)
          this.setState({ persons: this.state.persons.filter(p => p.id !== person.id) })
        })
    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  render() {
    const regex = new RegExp(this.state.filter, 'i')
    const personsToShow = 
      this.state.filter === '' ?
      this.state.persons :
      this.state.persons.filter(person => regex.test(person.name))

    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <Notification message={this.state.notification} />
        <Input text={'rajaa näytettäviä:'} value={this.state.filter} handler={this.handleFilterChange} />
        <h2>Lisää uusi</h2>
        <form onSubmit={this.addPerson}>
          <Input text={'nimi:'} value={this.state.newName} handler={this.handleNameChange} />
          <Input text={'numero:'} value={this.state.newNumber} handler={this.handleNumberChange} />
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <Persons persons={personsToShow} deletePerson={this.deletePerson} />
      </div>
    )
  }
}

export default App
