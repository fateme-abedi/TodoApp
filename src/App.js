import React from 'react';
import './App.css';
import AddTodoForm from './components/AddTodoForm';
import { css } from '@emotion/react'

function App() {
  return (
    <div css={css`
    
    background-color: #777;
    font-size: 24px;
    border-radius: 4px;
    color:#ddd;
    display:flex;
    align-items: center;
    
  `}>
    
    <AddTodoForm/>

    </div>
  )
  
}

export default App;
