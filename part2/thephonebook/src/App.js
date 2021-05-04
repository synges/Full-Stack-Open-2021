import React, { useState, useEffect } from 'react';

import personService from './personService';
import Filter from './Filter';
import Form from './Form';
import Persons from './Persons';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [nameFilter, setnameFilter] = useState('');

	useEffect(() => {
		personService.getAll().then((persons) => {
			setPersons(persons);
		});
	}, []);

	const addPerson = (event) => {
		event.preventDefault();

		const foundPerson = persons.find(
			(person) => person.name.toLowerCase() === newName.toLowerCase()
		);

		if (foundPerson) {
			if (
				window.confirm(
					`${newName} is already added to phonebook, replace the old number with a new one?`
				)
			) {
				personService
					.update(foundPerson, { ...foundPerson, number: newNumber })
					.then((returnedPerson) => {
						setPersons(
							persons.map((person) =>
								person.id !== foundPerson.id ? person : returnedPerson
							)
						);
						setNewName('');
						setNewNumber('');
					});
			}
		} else {
			const newPerson = { name: newName, number: newNumber };
			personService.create(newPerson).then((returnedPerson) => {
				setPersons(persons.concat(returnedPerson));
				setNewName('');
				setNewNumber('');
			});
		}
	};

	const deletePerson = (deletedPerson) => {
		if (window.confirm(`Delete ${deletedPerson.name}`)) {
			personService.deletePerson(deletedPerson).then((status) => {
				setPersons(persons.filter((person) => person.id !== deletedPerson.id));
			});
		}
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const handleFilterChange = (event) => {
		setnameFilter(event.target.value);
	};

	const personsToShow = nameFilter
		? persons.filter((person) =>
				person.name.toLowerCase().includes(nameFilter.toLowerCase())
		  )
		: persons;

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter nameFilter={nameFilter} handleFilterChange={handleFilterChange} />
			<h3>add a new</h3>
			<Form
				newName={newName}
				handleNameChange={handleNameChange}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
				addPerson={addPerson}
			/>
			<h3>Numbers</h3>
			<Persons personsToShow={personsToShow} deletePerson={deletePerson} />
		</div>
	);
};

export default App;
