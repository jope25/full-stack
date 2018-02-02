import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: [0, 0, 0, 0, 0, 0],
    }
  }

  render() {
    const selectAnecdote = () => () => {
      const selection = Math.floor(Math.random() * (this.state.votes.length));
      this.setState({ selected: selection })
    }
    const selected = this.state.selected

    const vote = () => () => {
      const copy = this.state.votes
      copy[selected] += 1
      this.setState({ votes: copy })     
    }
    const mostVoted = 
      this.state.votes.reduce((maxIndex, curNum, curIndex, array) => curNum > array[maxIndex] ?
      curIndex : maxIndex, 0);
    return (
      <div>
        <div>
          {this.props.anecdotes[selected]}
          <br />
          has {this.state.votes[selected]} votes
        </div>
        <button onClick={vote()}>vote</button>
        <button onClick={selectAnecdote()}>next anecdote</button>
        <h3>anecdote with most votes:</h3>
        <div>
          {this.props.anecdotes[mostVoted]}
          <br />
          has {this.state.votes[mostVoted]} votes
        </div>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
