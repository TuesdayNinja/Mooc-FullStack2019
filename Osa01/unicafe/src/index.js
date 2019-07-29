/*
Mooc Fullstack 2019
Loviisa Hurme
Tehtävä unicafe
*/


import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const CalculateAverage = ({good, neutral, bad}) => {
  return (
    <p>
    Average rating is {(good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)}
    </p>
    )
}


const CalculatePositivePercent = ({good, neutral, bad}) => {
  return (
    <p>
    Percent for positive feedback is {good/(good+neutral+bad)} %
    </p>
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
      <button onClick={handleGoodClick}>Good</button>
      <button onClick={handleNeutralClick}>Neutral</button>
      <button onClick={handleBadClick}>Bad</button>
      <h3>Statistics</h3>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>Feedbacks given {good + neutral + bad}</p>
      <CalculateAverage good = {good} neutral = {neutral} bad = {bad}/>
      <CalculatePositivePercent good = {good} neutral = {neutral} bad = {bad}/>

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)