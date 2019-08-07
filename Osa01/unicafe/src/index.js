/*
Mooc Fullstack 2019
Loviisa Hurme
Tehtävä unicafe
*/


import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistic = ({text, value}) => {
  return (
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
    )
}

const Statistics = ({good, neutral, bad}) => {
  let total = good + neutral + bad;
  if (total === 0) {
    return(
      <p>
      No feedback given.
      </p>
      )
  }

  return(
    <div>
      <table>
        <tbody>
          <Statistic text="Good" value={good}/>
          <Statistic text="Neutral" value={neutral}/>
          <Statistic text="Bad" value={bad}/>
          <Statistic text="Feedbacks given " value={total}/>
          <Statistic text="Average rating" value={(good - bad) / total}/>
          <Statistic text="Percent for positive feedback" value={good/total + '%'}/>
        </tbody>
      </table>
    </div>

    )

}


const Button = ({ handleClick, text }) => {
    return(
        <button onClick={handleClick}>
          {text}
        </button>
        )
  }


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGoodClick = () => {
  	setGood(good + 1)
  }

  const handleNeutralClick = () => {
  	setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
  	setBad(bad + 1)
  }


  return (
    <div>
      <h1>UNICAFE</h1>
      <h3>Give feedback</h3>
      <Button handleClick={handleGoodClick} text="Good"></Button>
      <Button handleClick={handleNeutralClick} text="Neutral"></Button>
      <Button handleClick={handleBadClick} text="Bad"></Button>
      <h3>Statistics</h3>
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)