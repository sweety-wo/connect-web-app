import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import createRootReducer from './createRootReducer';
import history from './history';
import { routerMiddleware } from 'connected-react-router';

const middlewares = [thunk, routerMiddleware(history)];
if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
}

const initialState = {};

const store = createStore(
    createRootReducer(history),
    initialState,
    applyMiddleware(...middlewares)
);

export default store;
