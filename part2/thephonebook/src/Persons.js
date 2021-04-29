import React from 'react'

const Person = ({person}) => {
    return (
        <h3>{person.name} {person.number}</h3>
    )
}

const Persons = ({personsToShow}) => {
    return (
        <>
        {personsToShow.map(person => <Person key={person.name} person={person} />)}
        </>
    )
}

export default Persons