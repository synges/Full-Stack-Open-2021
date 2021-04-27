import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick = {handleClick}>
    {text}
  </button>
)


const Display = ({good, neutral, bad, all}) => (
  <div>
    <h1>statistics</h1>
    good {good}
    <br/>
    neutral {neutral}
    <br/>
    bad {bad}
    <br/>
    all {all}
    <br/>
    average {(good-bad)/all}
    <br/>
    positive {good/all*100} %
  </div>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const increaseValue =  value => {
    switch(value){
      case "good":
        setGood(good+1)
        break;
      case "bad":
        setBad(bad+1)
        break;
      case "netural":
        setNeutral(neutral+1)
        break;
    }
    setAll(all+1)
  }

  
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={()=> increaseValue("good")} text="good"/>
      <Button handleClick={()=> increaseValue("netural")} text="neutral"/>
      <Button handleClick={()=> increaseValue("bad")} text="bad"/>
      <Display good={good} bad={bad} neutral={neutral} all={all}/>
    </div>
  )
}

export default App