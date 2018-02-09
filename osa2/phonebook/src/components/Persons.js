import React from 'react';

const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      <h2>Numerot</h2>
      <table>
        <tbody>
          {persons.map(person =>
            <Person key={person.name} person={person} deletePerson={deletePerson(person)} />
          )}
        </tbody>
      </table>
    </div>
  )
}

const Person = ({ person, deletePerson }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td><button onClick={deletePerson}>poista</button></td>
    </tr>
  )
}

export default Persons
