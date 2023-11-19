import { configureStore } from '@reduxjs/toolkit'
import todaytodosSlice from './todaytodosSlice'
import { useDispatch } from 'react-redux'
import monthtodosSlice from './monthtodosSlice'
import postToPocketSlice from './postToPocketSlice'
import deleteToPocketSlice, { deleteToPocket } from './deleteToPocketSlice';

export const store = configureStore({
  reducer: {
    todaytodos: todaytodosSlice,
    monthtodos: monthtodosSlice,
    postToPocket: postToPocketSlice,
    deleteToPocket: deleteToPocketSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
// 전체 상태 타입, store.getState로 타입추론
export type RootState = ReturnType<typeof store.getState>


// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// dispatch
export type AppDispatch = typeof store.dispatch
