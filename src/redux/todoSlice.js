import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export const todoSlice=createSlice({ 
    name:'todos',
    initialState:[],
    reducers:{
        addTodo:(state, action)=>{
            const todo={
                id: nanoid(),
                title:action.payload.title,
                completed:false,
            };

            state.push(todo)

        },

        toggleCompleted:(state, action)=>{
            const index=state.findIndex((todo)=>
                todo.id === action.payload.id
            )
            state[index].completed = action.payload.completed;
        },

        deleteTodo:(state, action)=>{

            return state.filter((todo) => todo.id !== action.payload.id);
        }
       
    },

    extraReducers:{

    }
});

export const {addTodo, toggleCompleted, deleteTodo}=todoSlice.actions;

export default todoSlice.reducer;