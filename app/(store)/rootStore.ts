import { configureStore } from '@reduxjs/toolkit'
import ticketReducer from './ticketStore'

export const store = configureStore({
  reducer: {
    ticket: ticketReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch