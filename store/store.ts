import { configureStore } from '@reduxjs/toolkit'
import todoSlice from './todoSlice'

export const store = configureStore({
  reducer: {
    todo:todoSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
// 전체 상태 타입, store.getState로 타입추론
export type RootState = ReturnType<typeof store.getState>


// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// dispatch
export type AppDispatch = typeof store.dispatch
