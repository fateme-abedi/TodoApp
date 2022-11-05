import React, { useState, useEffect } from 'react'
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

import { deleteAll } from '../redux/todoSlice'
import { getTodosAsync } from '../redux/todoSlice'
function TodoList(props) {
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todos)
  const [ids, setIds] = useState([])
  const [deleteTodos, setDeleteTodos] = useState(false)

  useEffect(() => {
    dispatch(getTodosAsync())
  }, [dispatch])

  return (
    <>
      {deleteTodos && (
        <button
          className={css`
                 
                    background-color:  rgb(243, 14, 14);
                    color:'#fff';
                    text-spacing:1.2px
                    border:none;
                    border-radius:5px;
                    padding:5px 10px ;
                    margin:8px 40% 12px 85%;

                    &:hover{
                      background-color:#111;
                      color:rgb(243, 14, 14);
                    }
                   
                  
                `}
          onClick={() => {
            console.log('delete' + ids)
            dispatch(deleteAll(ids))
          }}
        >
          DeleteAll
        </button>
      )}
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          className={css`
            padding: 32px;
            font-size: 24px;
            border-radius: 4px;
            background-color: #ddd;
            width: 100%;
            overflow: hidden;
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
            {todos.map((todo, id) => (
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                key={todo.id}
                className={css`
                  &:active {
                    background-color: rgb(235, 76, 76);
                  }
                `}
                onClick={() => {
                  ids.push(todo.id)
                  setIds(ids)
                  console.log(ids)
                  if (ids.length > 0) {
                    setDeleteTodos(true)
                  }
                }}
              >
                <TodoItem
                  component="th"
                  scope="row"
                  key={todo.id}
                  id={todo.id}
                  title={todo.title}
                  completed={todo.completed}
                  // onClick={selectHandler(id)}
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
