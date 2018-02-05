import React from 'react';
import Table from './components/Table'
import Input from './components/Input'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: props.persons,
      newName: '',
      newNumber: '',
      filter: '',
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber,
    }

    if (!this.state.persons.some(person => person.name === personObject.name)) {
      const persons = this.state.persons.concat(personObject)

      this.setState({
        persons,
        newName: '',
      })
    } else {
      alert('The name has already been given!')
      this.setState({ newName: '' })
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
        <Input text={'rajaa näytettäviä:'} searchTerm={this.state.filter} handler={this.handleFilterChange} />
        <h2>Lisää uusi</h2>
        <form onSubmit={this.addPerson}>
          <Input text={'nimi:'} searchTerm={this.state.newName} handler={this.handleNameChange} />
          <Input text={'numero:'} searchTerm={this.state.newNumber} handler={this.handleNumberChange} />
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <Table persons={personsToShow} />
      </div>
    )
  }
}

export default App
