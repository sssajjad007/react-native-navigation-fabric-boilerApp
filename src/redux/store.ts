import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';

let flipperMiddlewares: any = null;

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  flipperMiddlewares = createDebugger();
}
import appReducer from './slices/app';

const store = configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    __DEV__ ? getDefaultMiddleware().concat(flipperMiddlewares) : getDefaultMiddleware(),
});

const { dispatch } = store;

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export { store, dispatch, useSelector, useDispatch };
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
