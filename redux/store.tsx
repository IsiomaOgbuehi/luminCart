import reducers from './reducer/index';
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({ reducer: reducers });
export default store;