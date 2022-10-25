import React, { useState } from 'react'
import TableCell from '@mui/material/TableCell'
import { css } from '@emotion/css'
import { deleteTodo, toggleCompleted } from '../redux/todoSlice'
import { useDispatch } from 'react-redux'

function TodoItem({ id, title, completed }) {
  const dispatch = useDispatch()
  const [check, setCheck] = useState(false)
  const checkboxHandler = () => {
    dispatch(toggleCompleted({ id, completed: !completed }))

    if (completed === false) {
      setCheck(true)
    } else {
      setCheck(false)
    }
    console.log(completed)
  }

  const deleteHandler = () => {
    dispatch(deleteTodo({ id }))
  }
  return (
    <TableCell>
      <div
        className={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1;
          color: rgb(5, 99, 28);
          font-size: 16px;
          font-weight: bold;
        `}
      >
        <input
          id="check"
          type="checkbox"
          checked={completed}
          onChange={checkboxHandler}
        ></input>

        {check ? (
          <label
            htmlFor="check"
            className={css`
              flex: 1;
              text-decoration: line-through;
            `}
          >
            {' '}
            {title}
          </label>
        ) : (
          <label
            htmlFor="check"
            className={css`
              flex: 1;
              text-decoration: none;
            `}
          >
            {title}
          </label>
        )}

        <button
          className={css`
            margin: 10px;
            padding: 5px 8px;
            border: none;
            border-radius: 5px;
            font-size: 15px;
            background-color: rgb(243, 14, 14);
          `}
          onClick={deleteHandler}
        >
          Delete
        </button>
        <input
          id="check"
          type="checkbox"
          onSelectionModelChange={(id) => {
            console.log(id)
          }}
        ></input>
      </div>
    </TableCell>
  )
}

export default TodoItem
