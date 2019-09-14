import React from 'react'

const Header = ({name}) => {
		return (
			<div>
				<h2>{name}</h2>
			</div>
			)
	}

const Part = ({parts}) => {

	return(
		<div>
			<p>
			{parts.name} {parts.exercises}
			</p>
		</div>
		)
}


const Content = ({parts}) => {
	return(
		parts.map(part => <Part key={part.id} parts={part}/>)
		)
}

const Total = ({parts}) => {
	return(

		<b>
		Number of exercises {parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises
	    , 0)}
	    </b>

	)


}

const Course = ({courses}) => {

	return (
	courses.map(course =>
	<div key={course.name}>
      <Header name={course.name}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
    </div>)

  )
}


export default Course

