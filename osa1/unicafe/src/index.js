import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      good: 0,
      neutral: 0,
      bad: 0,
    }
  }

  render() {
    const clickButton = (button) => () => {
      this.setState({ [button]: this.state[button] + 1 })
    }
    return (
      <div>
        <h2>anna palautetta</h2>       
        <Buttons actionGood={clickButton('good')} actionNeutral={clickButton('neutral')}
          actionBad={clickButton('bad')} />     
        <h2>statistiikka</h2>
        <Statistics feedback={this.state} />
      </div>
    )
  }
}

const Buttons = (props) => {
  return (
    <div>
      <Button action={props.actionGood} text='hyvä' />
      <Button action={props.actionNeutral} text='neutraali' />
      <Button action={props.actionBad} text='huono' />
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.action}>{props.text}</button>
  )
}

const Statistics = (props) => {
  const good = props.feedback.good
  const neutral = props.feedback.neutral
  const bad = props.feedback.bad

  const feedbackTotal = good + bad + neutral

  const average = () => Math.round((good - bad) / (feedbackTotal) * 10) / 10
  const positive = () => Math.round(good / (feedbackTotal) * 1000) / 10 + ' %'

  if (good === 0 && neutral === 0 &&  bad === 0) {
    return (
      <div>
        <p>ei yhtään palautetta annettu</p>
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <Statistic text='hyvä' stat={good} />
        <Statistic text='neutraali' stat={neutral} />
        <Statistic text='huono' stat={bad} />
        <Statistic text='keskiarvo' stat={average()} />
        <Statistic text='positiivisia' stat={positive()} />
      </tbody>
    </table>
  )
}

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.stat}</td>
    </tr>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
