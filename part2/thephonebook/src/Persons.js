import React from 'react';

const Person = ({ person, deletePerson }) => {
	return (
		<h3>
			{person.name} {person.number}
			<button onClick={() => deletePerson(person)}>delete </button>
		</h3>
	);
};

const Persons = ({ personsToShow, deletePerson }) => {
	return (
		<>
			{personsToShow.map((person) => (
				<Person key={person.name} person={person} deletePerson={deletePerson} />
			))}
		</>
	);
};

export default Persons;
