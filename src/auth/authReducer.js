import ActionTypes from '../constants/ActionTypes';

export default function authReducer(state = {}, action) {
    switch (action.type) {
        case ActionTypes.LoginSuccess:
            return {
                ...state,
                ...action.payload
            };
        case ActionTypes.LogoutSuccess:
            return {};
        default:
            return state;
    }
}
