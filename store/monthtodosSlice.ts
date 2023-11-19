import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Todo {
  id: number;
  dateTodo: string;
  content: string;
  completed: boolean;
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

// pocketbase 전체 데이터 가져오는 부분
// RTK 저장은 따로 extraReducer에서
export const fetchTodos = createAsyncThunk( 
  'todos/fetchTodos', 
  async(_, thunkAPI) => {
    try{
      const response = await axios.get('http://127.0.0.1:8090/api/collections/todolist/records');
      // console.log('Todos response', response.data);
      return response.data;
    } catch (error) { 
      return thunkAPI.rejectWithValue("에러");
    }
})


// 접근경로: state -> (name)monthtodos -> todos -> todo -> id, todo, completed
export const monthtodosSlice = createSlice({
  name: 'monthtodos',
  initialState,
  reducers: {

    // 새로운 할 일 추가
    addTodos: (state, action: PayloadAction<{content: string; dateTodo_str: string}>) => {
      const { content, dateTodo_str } = action.payload;
      const newTodo = {
        id: Date.now(),
        dateTodo: dateTodo_str,
        content: content,
        completed: false,
      }
      state.todos.push(newTodo);
    },

    // 완료 여부 업데이트
    updateCompleted: (state, action: PayloadAction<{update_id: number; update_completed: boolean}>) => {
      const { update_id, update_completed } = action.payload;
      const updatedtodo = state.todos.find(todo => todo.id === update_id);
      if (updatedtodo) {
        updatedtodo.completed = update_completed;
      }
    },

    // 할 일 내용 변경 업데이트
    updateTodos: (state, action: PayloadAction<{update_id: number; update_todo: string}>) => {
      const { update_id, update_todo } = action.payload;
      const updatedtodo = state.todos.find(todo => todo.id === update_id);
      if (updatedtodo) {
        updatedtodo.content = update_todo;
      }
    },

    // 할 일 삭제
    deleteTodos: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },

    // 전체 삭제
    clearTodayTodos: (state) => {
      state.todos = [];
    },
  },

  // Pocketbase -> RTK 저장
  extraReducers: (builder) => {
    builder
    .addCase(fetchTodos.pending, (state) => {
      state.loading = 'loading';
    })
    .addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = 'success';
      state.todos = action.payload.items;
    })
    .addCase(fetchTodos.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    })
  }
})

export const { addTodos, updateCompleted, updateTodos, deleteTodos, clearTodayTodos } = monthtodosSlice.actions
// export const selectTodayTodo = (state: RootState) => state.todaytodos.todos; // select 결과

export default monthtodosSlice.reducer;