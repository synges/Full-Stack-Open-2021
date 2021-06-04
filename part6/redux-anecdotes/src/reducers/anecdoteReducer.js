import anecdoteService from '../services/anecdoteService'

const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.increaseVote(anecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote,
    })
  }
}

const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE': {
      const id = action.data.id
      const anecdoteToVote = state.find((n) => n.id === id)
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      }
      return state
        .map((anecdote) => (anecdote.id !== id ? anecdote : changedAnecdote))
        .sort((a, b) => b.votes - a.votes)
    }
    case 'NEW_ANECDOTE': {
      return [...state, action.data].sort((a, b) => b.votes - a.votes)
    }
    case 'INIT_ANECDOTES': {
      return action.data.sort((a, b) => b.votes - a.votes)
    }
    default:
      return state
  }
}

export default anecdoteReducer
export { voteAnecdote, createAnecdote, initializeAnecdotes }
