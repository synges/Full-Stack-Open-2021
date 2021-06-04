import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setMessage, clearMessage } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes.filter((anecdote) =>
      anecdote.content.includes(state.filter)
    )
  )
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setMessage(`you voted '${anecdote.content}'`))
    setTimeout(() => dispatch(clearMessage()), 5000)
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteForm
