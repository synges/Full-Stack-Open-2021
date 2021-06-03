const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id },
  }
}

const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data,
  }
}

const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
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
      return action.data
    }
    default:
      return state
  }
}

export default anecdoteReducer
export { voteAnecdote, createAnecdote, initializeAnecdotes }
