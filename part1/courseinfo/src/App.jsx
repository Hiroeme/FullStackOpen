const Header = (props) => {

  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  
  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  )
}

const Content = ({parts}) => {
  // console.log(parts[0]);
  return (
    <>
      {parts.map(part => (
        <Part part={part.name} exercises={part.exercises}/>
      ))}
      {/* <Part part={parts[0].name} exercises={parts[0].exercises}/> */}
      {/* <Part part={part2} exercises={exercises2}/>
      <Part part={part3} exercises={exercises3}/> */}
    </>
  )
}

const Total = ({parts}) => {
  // console.log(parts);
  return (
    <>
      <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
    </>
  )
}



const App = () => {
  // const course = 'Half Stack application development'
  // const part1 = {
  //   name: 'Fundamentals of React',
  //   exercises: 10
  // }
  // const part2 = {
  //   name: 'Using props to pass data',
  //   exercises: 7
  // }
  // const part3 = {
  //   name: 'State of a component',
  //   exercises: 14
  // }

  // const parts = {
  //   part1: part1.name,
  //   part2: part2.name,
  //   part3: part3.name
  // }
  // const exercises = {
  //   exercises1: part1.exercises, 
  //   exercises2: part2.exercises, 
  //   exercises3: part3.exercises
  // }

  // const parts = [
  //   {
  //     name: 'Fundamentals of React',
  //     exercises: 10
  //   },
  //   {
  //     name: 'Using props to pass data',
  //     exercises: 7
  //   },
  //   {
  //     name: 'State of a component',
  //     exercises: 14
  //   }
  // ]

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App