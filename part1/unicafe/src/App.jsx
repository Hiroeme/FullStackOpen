import { useState } from 'react'


const Header = (props) => <h1>{props.text}</h1>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Stat = ({info, stat, text}) => {
  return (
    <>
      <tr>
        <td>{info}</td> 
        <td>{stat} {text}</td>
      </tr>
    </>
  )
}



const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <table>
      <tbody>
        <Stat info="good" stat={good}/>
        <Stat info="neutral" stat={neutral}/>
        <Stat info="bad" stat={bad}/>
        <Stat info="all" stat={good+neutral+bad}/>
        <Stat info="average" stat={(good+bad*-1)/(good+neutral+bad)}/>
        <Stat info="positive" stat={100 * good/(good+neutral+bad)} text="%"/>
      </tbody>
    </table>
  )
} 


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const addGood = () => {
    setGood(good + 1)
    // console.log(good)
  }

  const addNeutral = () => {
    setNeutral(neutral + 1)
  }

  const addBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header text='give feedback'/>
      <Button onClick={addGood} text='good'/>
      <Button onClick={addNeutral} text='neutral'/>
      <Button onClick={addBad} text='bad'/>

      <Header text="statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App