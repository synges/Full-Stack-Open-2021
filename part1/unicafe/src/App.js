import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick = {handleClick}>
    {text}
  </button>
)

const Statistic = ({text,value})  => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)


const Statistics = ({good, neutral, bad, all}) => (
  <table>
    <tbody>
    <Statistic text="good" value ={good} />
    <Statistic text="neutral" value ={neutral} />
    <Statistic text="bad" value ={bad} />
    <Statistic text="all" value ={all} />
    <Statistic text="average" value ={(good-bad)/all} />
    <Statistic text="positive" value ={good/all*100 + " %"} />
    </tbody>
  </table>
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
      default:
        break;  
    }
    setAll(all+1)
  }

  if(all === 0){
    return (
      <div>
        <h1>give feedback</h1>
        <Button handleClick={()=> increaseValue("good")} text="good"/>
        <Button handleClick={()=> increaseValue("netural")} text="neutral"/>
        <Button handleClick={()=> increaseValue("bad")} text="bad"/>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={()=> increaseValue("good")} text="good"/>
      <Button handleClick={()=> increaseValue("netural")} text="neutral"/>
      <Button handleClick={()=> increaseValue("bad")} text="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} all={all}/>
    </div>
  )
}

export default App