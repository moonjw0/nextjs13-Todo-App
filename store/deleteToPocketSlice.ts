import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Todo {
  dateTodo: string;
  content: string;
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

// pocketbase로 새로 생성된 데이터 전송하는 부분
export const deleteToPocket = createAsyncThunk( 
  'todos/deleteToPocket', 
  async({id, deleteTodo}: {id: string; deleteTodo: Todo}, thunkAPI) => {
    try{
      const response = await axios.patch(`http://127.0.0.1:8090/api/collections/todolist/records/:${id}`, deleteTodo);
      // console.log('Todos response', response.data);
      return response.data;
    } catch (error) { 
      return thunkAPI.rejectWithValue("에러");
    }
})


// 접근경로: state -> (name)todaytodos -> todos -> todo -> id, todo, completed
export const deleteToPocketSlice = createSlice({
  name: 'deleteToPocket',
  initialState,
  reducers: {},
  // UI 변경 -> Pocketbase 저장
  extraReducers: (builder) => {
    builder
    .addCase(deleteToPocket.pending, (state) => {
      state.loading = 'loading';
    })
    .addCase(deleteToPocket.fulfilled, (state, action) => {
      state.loading = 'success';
      state.todos.push(action.payload);
    })
    .addCase(deleteToPocket.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    })
  }
})

export default deleteToPocketSlice.reducer;
