import React from 'react'

const Kurssi = ({ kurssi }) => {
  return (
    <div>
      <Otsikko nimi={kurssi.nimi} />
      <Sisalto osat={kurssi.osat} />
      <Yhteensa osat={kurssi.osat} />
    </div>
  )
}

const Otsikko = ({ nimi }) => <h2>{nimi}</h2>

const Sisalto = ({ osat }) => {
  return (
    <div>
      {osat.map(osa => <Osa key={osa.id} osa={osa} />)}
    </div>
  )
}

const Osa = ({ osa }) => <p>{osa.nimi} {osa.tehtavia}</p>

const Yhteensa = ({ osat }) => {
  const tehtavat = osat.map(osa => osa.tehtavia)
  const tehtaviaYhteensa = tehtavat.reduce((x, y) => x + y)
  return (
    <p>yhteensä {tehtaviaYhteensa} tehtävää</p>
  )
}

export default Kurssi
