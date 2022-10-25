import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import TodoList from './TodoList'

import { useDispatch } from 'react-redux'
import { addTodo } from '../redux/todoSlice'
import { css } from '@emotion/css'

function AddTodoForm(props) {
  const [titleValue, setTitleValue] = useState('')
  const dispatch = useDispatch()
  const formSubmitHandler = (event) => {
    event.preventDefault()

    if (titleValue) {
      dispatch(addTodo({ title: titleValue }))
    }
  }
  return (
    <>
      <form
        onSubmit={formSubmitHandler}
        className={css`
      padding: 32px;
      margin:13px
      font-size: 24px;
      border-radius: 4px;
      color: rgb(5, 99, 28);
      
      
    `}
      >
        <Box
          className={css`
            margin-bottom: 23px;
          `}
        >
          <TextField
            id="standard-basic"
            label="Write your task..."
            variant="standard"
            value={titleValue}
            onChange={(event) => setTitleValue(event.target.value)}
            className={css`
              margin-bottom: 23px;
              font-size: 24px;
              border-radius: 4px;
              color: #fff;
              width: 100%;
            `}
          />
        </Box>
        <button
          type="submit"
          className={css`
             
              margin-top:13px
              font-size: 24px;
              font-weight: bold;
              border-radius: 4px;
              color: rgb(5, 99, 28);
              background-color:#ddd;
              padding:5px 10px;
              transition:all 0.2s linear;
              &:hover{
                background-color:rgb(5, 99, 28);
                color:#ddd;
                transform:scale(1.1)
              }
    `}
        >
          Add Task
        </button>
      </form>
      <TodoList />
    </>
  )
}

export default AddTodoForm
