import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';


export const getTodosAsync = createAsyncThunk(
	'todos/getTodosAsync',
	async () => {
		const resp = await fetch('https://todosapp-bc036-default-rtdb.firebaseio.com/todos.json');
            
        const loadedTodos = [];
		if (resp.ok) {
			const todos = await resp.json();
			for( const id of todos){
				loadedTodos.push({ id: id, title:todos[id].title});
			}
			return { loadedTodos };
		}
	}
);


export const addTodoAsync = createAsyncThunk(
	'todos/addTodoAsync',
	async (payload) => {
		const task={
			id: nanoid(),
			title:payload.title,
			completed:false,
		};
		 await fetch('https://todosapp-bc036-default-rtdb.firebaseio.com/todos.json'

        , {
            
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(task),
		});

		// if (resp.ok) {
		// 	 const todos = await resp.json();
		// 	console.log(todo);
		// 	return { todos };
		// }

		
	}
);


export const toggleCompleteAsync = createAsyncThunk(
	'todos/completeTodoAsync',
	async (payload) => {
		const resp = await fetch(`https://todosapp-bc036-default-rtdb.firebaseio.com/todos.jsons/${payload.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ completed: payload.completed }),
		});

		if (resp.ok) {
			const todo = await resp.json();
			return { todo };
		}
	}
);


export const deleteTodoAsync = createAsyncThunk(
	'todos/deleteTodoAsync',
	async (payload) => {
		const resp = await fetch(`https://todosapp-bc036-default-rtdb.firebaseio.com/todos/${payload.id}.json`, {
			method: 'DELETE',
		});

		if (resp.ok) {
			return { id: payload.id };
		}
	}
);


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
        },

		deleteAll:(state, action)=>{

			const ids=action.payload;
			return state.filter((todo) => !ids.includes(todo.id))

		}
       
    },

    extraReducers:{

        [getTodosAsync.fulfilled]: (state, action) => {
			console.log("get::::"+action);
			state.todos=action.payload.todos;
			
		},
		[addTodoAsync.fulfilled]: (state, action) => {
			console.log("add::::"+action);
			state.push(action.payload.todo);
			
		},
		[toggleCompleteAsync.fulfilled]: (state, action) => {
			const index = state.findIndex(
				(todo) => todo.id === action.payload.todo.id
			);
			state[index].completed = action.payload.todo.completed;
		},
		[deleteTodoAsync.fulfilled]: (state, action) => {
			state.filter((todo) => todo.id !== action.payload.id);
		},

    }
});

export const {addTodo, toggleCompleted, deleteTodo, deleteAll}=todoSlice.actions;

export default todoSlice.reducer;