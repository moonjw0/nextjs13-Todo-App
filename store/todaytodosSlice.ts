import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
// import { RootState } from './store';

export interface Todo {
  id: number;
  content: string;
}

export interface TodayTodos {
  todos: Todo[]
  loading: 'idle' | 'loading' | 'success' | 'failed';
  error: string;
}

const initialState: TodayTodos = {
  todos: [
    {
      id:1 ,
      content: "졸리다"
    }
  ],
  loading: 'idle',
  error: "",
};


export const fetchTodayTodos = createAsyncThunk(
  'todaytodos/fetchTodayTodos', 
  async(_, thunkAPI) => {
    try{
    const response = await axios.get('http://127.0.0.1:8090/api/collections/todolist/records');
    // console.log('TodayTodos response', response.data);
    return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("에러");
    }
})


// 접근경로: state -> (name)todaytodos -> todos -> todo -> id, todo
export const todaytodosSlice = createSlice({
  name: 'todaytodos',
  initialState,
  reducers: {
    addTodos: (state, action: PayloadAction<string>) => {
      const newTodo = {
        id: Date.now(),
        content: action.payload
      }
      state.todos.push(newTodo);
    },
    deleteTodos: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    updateTodos: (state, action: PayloadAction<{update_id: number; newtodo: string}>) => {
      const { update_id, newtodo } = action.payload;
      const updatedtodo = state.todos.find(todo => todo.id === update_id);
      if (updatedtodo) {
        updatedtodo.content = newtodo;
      }
    },
    clearTodayTodos: (state) => {
      state.todos = [];
    },
  },

  extraReducers: (builder) => {
    builder
    .addCase(fetchTodayTodos.pending, (state) => {
      state.loading = 'loading';
    })
    .addCase(fetchTodayTodos.fulfilled, (state, action) => {
      state.loading = 'success';
      state.todos = action.payload;
    })
    .addCase(fetchTodayTodos.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    })
  }
})
export const { addTodos, deleteTodos, updateTodos, clearTodayTodos } = todaytodosSlice.actions
// export const selectTodayTodo = (state: RootState) => state.todaytodos.todos; // select 결과

export default todaytodosSlice.reducer;