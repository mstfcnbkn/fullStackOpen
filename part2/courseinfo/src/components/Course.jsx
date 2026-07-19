const Header = (props) => <h2>{props.name}</h2>

const Content = (props) => (
  <div>
    {props.parts.map(part => <Part key={part.id} part={part} />)}
  </div>
)

const Part = (props) => <p>{props.part.name} {props.part.exercises}</p>

const Total = (props) => (
  <p>
    <b>
      Total of {props.parts.reduce((sum, p) => sum + p.exercises, 0)} exercises
    </b>
  </p>
)

const Course = (props) => {
  return (
    <div>
      <Header name={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div> 
  )
}

export default Course