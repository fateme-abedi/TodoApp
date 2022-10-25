import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TodoItem from './TodoItem'
import { css } from '@emotion/css'
import { useSelector, useDispatch } from 'react-redux'

function TodoList(props) {
  const todos = useSelector((state) => state.todos)
  //for test

  // const todos = [
  //   { id: 1, title: 'task 1', completed: false },
  //   { id: 2, title: 'task 2', completed: true },
  //   { id: 3, title: 'task 3', completed: false },
  // ]

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          className={css`
            padding: 32px;
            font-size: 24px;
            border-radius: 4px;
            background-color: #ddd;
            &table.mailTable {
              border: 5px solid #111;
            }
          `}
        >
          <TableHead>
            <TableRow>
              <TableCell
                className={css`
                  font-size: 24px;
                  font-weight: bold;
                `}
              >
                Task Name
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo, i) => (
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TodoItem
                  component="th"
                  scope="row"
                  key={todo.id}
                  id={todo.id}
                  title={todo.title}
                  completed={todo.completed}
                >
                  {todo.title}
                </TodoItem>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default TodoList
