import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then((response) => response.data)
}

const create = (newPerson) => {
	const request = axios.post(baseUrl, newPerson)
	return request.then((reponse) => reponse.data)
}

const deletePerson = (person) => {
	const request = axios.delete(`${baseUrl}/${person.id}`)
	return request.then((response) => response.status)
}

const update = (person, updatedPerson) => {
	const request = axios.put(`${baseUrl}/${person.id}`, updatedPerson)
	return request.then((response) => response.data)
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, deletePerson, update }
