import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as toastrReducer } from 'react-redux-toastr';
import menuReducer from '../layout/menuReducer';
import authReducer from '../auth/authReducer';

export default function createRootReducer(history) {
    return combineReducers({
        router: connectRouter(history),
        toastr: toastrReducer,
        menu: menuReducer,
        auth: authReducer
    });
}
