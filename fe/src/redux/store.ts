/* eslint-disable import/no-cycle */
import { configureStore } from '@reduxjs/toolkit';
import _ from 'lodash';
import { actionFuncMiddleware } from './middleware/actionFuncMiddleware';
import { schemaApi } from './services/schemaApi';
import { CMDKReducer } from './slices/CMDKSlice';
import { formReducer } from './slices/FormSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
    CMDK: CMDKReducer,
    [schemaApi.reducerPath]: schemaApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(schemaApi.middleware, actionFuncMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

function listener() {
  const currentState = store.getState();
  const activeSchema = _.get(currentState, 'form.activeSchema', {});
  // @ts-expect-error should error
  window.currentSchema = activeSchema;
}

store.subscribe(listener);
