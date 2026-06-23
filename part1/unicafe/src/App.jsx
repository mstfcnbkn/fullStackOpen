import { useState } from 'react'

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Statistics good={good} neutral={neutral} bad={bad} setGood={setGood} setNeutral={setNeutral} setBad={setBad} />
    </div>
  ) 
}

const Statistics = ({ good, neutral, bad, setGood, setNeutral, setBad }) => {
  if (good || neutral || bad) {
    return (
    <div>
      <Header text="give feedback" />
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      <table>
        <tbody>
          <tr>
            <td><StatisticLine text="good" value={good} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="neutral" value={neutral} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="bad" value={bad} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="all" value={good+neutral+bad} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="average" value={(good-bad) / (good+neutral+bad)} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="positive" value={(good / (good+neutral+bad)) * 100+ " %"} /></td>
          </tr>
        </tbody>
      </table>
    </div> 
    )
  } else {
    return (
    <div>
      <Header text="give feedback" />
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      <p>No feedback given</p>
    </div>
    )
  }
}

const StatisticLine = ({ text, value }) => (
  <p>{text} {value}</p>
)

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Header = ({ text }) => <h1>{text}</h1>

export default App