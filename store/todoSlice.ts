import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Todo {
  id: string;
  dateTodo: string;
  content: string;
  completed: boolean
}

export interface Todos {
  todos: Todo[]
  loading: 'idle' | 'loading' | 'success' | 'failed';
  error: string;
}

const initialState: Todos = {
  todos: [],
  loading: 'idle',
  error: "",
};

export interface PostTodo {
  dateTodo: string;
  content: string;
  completed: boolean
}

// pocketbase 전체 데이터 가져오는 부분
// RTK 저장은 따로 extraReducer에서
export const fetchTodo = createAsyncThunk( 
  'todo/fetchTodo', 
  async(_, thunkAPI) => {
    try{
      const response = await axios.get('http://127.0.0.1:8090/api/collections/todolist/records');
      // console.log('Todos response', response.data);
      return response.data;
    } catch (error) { 
      return thunkAPI.rejectWithValue("에러");
    }
})

// pocketbase로 새로 생성된 데이터 전송하는 부분
export const postTodo = createAsyncThunk( 
  'todo/postTodo', 
  async(newTodo: PostTodo, thunkAPI) => {
    try{
      const response = await axios.post('http://127.0.0.1:8090/api/collections/todolist/records', newTodo);
      // console.log('Todos response', response.data);
      return response.data;
    } catch (error) { 
      return thunkAPI.rejectWithValue("에러");
    }
})

// pocketbase로 업데이트된 데이터 전송하는 부분
export const updateTodo = createAsyncThunk( 
  'todo/updateTodo', 
  async({id, updatedTodo}: {id: string; updatedTodo: Todo}, thunkAPI) => {
    try{
      const response = await axios.patch(`http://127.0.0.1:8090/api/collections/todolist/records/${id}`, updatedTodo);
      // console.log('Todos response', response.data);
      return response.data;
    } catch (error) { 
      return thunkAPI.rejectWithValue("에러");
    }
})

// pocketbase로 삭제된 데이터 전송하는 부분
export const deleteTodo = createAsyncThunk( 
  'todo/deleteTodo', 
  async(id: string, thunkAPI) => {
    try{
      const response = await axios.delete(`http://127.0.0.1:8090/api/collections/todolist/records/${id}`);
      // console.log('Todos response', response.data);
      return id;
    } catch (error) { 
      return thunkAPI.rejectWithValue("에러");
    }
})

// 접근경로: state -> (name)todo -> todos -> todo -> id, todo, completed
export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},

  // Pocketbase -> RTK 저장
  extraReducers: (builder) => {
    // fetch
    builder
    .addCase(fetchTodo.pending, (state) => {
      state.loading = 'loading';
    })
    .addCase(fetchTodo.fulfilled, (state, action) => {
      state.loading = 'success';
      state.todos = action.payload.items;
    })
    .addCase(fetchTodo.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    })

    // post
    .addCase(postTodo.pending, (state) => {
      state.loading = 'loading';
    })
    .addCase(postTodo.fulfilled, (state, action) => {
      state.loading = 'success';
      state.todos.push(action.payload);
    })
    .addCase(postTodo.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    })

    // update
    .addCase(updateTodo.pending, (state) => {
      state.loading = 'loading';
    })
    .addCase(updateTodo.fulfilled, (state, action) => {
      state.loading = 'success';
      state.todos.push(action.payload);
    })
    .addCase(updateTodo.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    })

    // delete
    .addCase(deleteTodo.pending, (state) => {
      state.loading = 'loading';
    })
    .addCase(deleteTodo.fulfilled, (state, action) => {
      state.loading = 'success';
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    })
    .addCase(deleteTodo.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    })
  }
})

export default todoSlice.reducer;