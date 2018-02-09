import React from 'react';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      countries: [],
    }
  }

  handleSearchChange = (event) => {
    this.setState({ search: event.target.value })
  }

  setSearchTo = (name) => () => {
    this.setState({ search: name })
  }

  componentWillMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  render() {
    const regex = new RegExp(this.state.search, 'i')
    const countries = this.state.countries.filter(country => regex.test(country.name))
    let result;
    
    if (countries.length === 0) {
      result = 'no matches, specify another filter'
    } else if (countries.length === 1) {
      result = <Country country={countries[0]} />
    } else if (countries.length <= 10) {
      result = <Countries countries={countries} action={this.setSearchTo} />
    } else {
      result = 'too many matches, specify another filter'
    }

    return (
      <div>
        <div>
          find countries:
          <input value={this.state.search} onChange={this.handleSearchChange} />
        </div>
        {result}
      </div>
    )
  }
}

const Countries = ({ countries, action }) => {
  return (
    <div>
      {countries.map(country =>
        <div key={country.alpha3Code} onClick={action(country.name)}>
          {country.name}
        </div>
      )}
    </div>
  )
}

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name} {country.nativeName}</h2>
      <p>
        capital: {country.capital} <br />
        population: {country.population} <br />
      </p>
      <img src={country.flag} alt='Flag of the country' width= '200' />
    </div>
  )
}

export default App;
