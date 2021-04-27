import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick = {handleClick}>
    {text}
  </button>
)


const Display = ({good, neutral, bad}) => (
  <div>
    <h1>statistics</h1>
    good {good}
    <br/>
    neutral {neutral}
    <br/>
    bad {bad}
  </div>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={()=> setGood(good+1)} text="good"/>
      <Button handleClick={()=> setNeutral(neutral+1)} text="neutral"/>
      <Button handleClick={()=> setBad(bad+1)} text="bad"/>
      <Display good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App