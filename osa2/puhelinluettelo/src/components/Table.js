import React from 'react';

const Table = ({ persons }) => {
  return (
    <div>
      <h2>Numerot</h2>
      <table>
        <tbody>
          {persons.map(person =>
            <tr key={person.name}>
              <td>{person.name}</td>
              <td>{person.number}</td>
            </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default Table
