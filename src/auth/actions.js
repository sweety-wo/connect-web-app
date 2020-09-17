import ActionTypes from '../constants/ActionTypes';
import { replace } from 'connected-react-router';
import axios from 'axios';
import { toastr } from 'react-redux-toastr';

export function login(payload) {
    return (dispatch, getState) => {
        dispatch({ type: ActionTypes.VerifyLoginPending });
        axios
            .get(process.env.REACT_APP_API_URL + '/login', {
                headers: { Authorization: `Bearer ${payload.tokenId}` }
            })
            .then(() => {
                dispatch({ type: ActionTypes.VerifyLoginSuccess });
                sessionStorage.setItem('auth', JSON.stringify(payload));
                dispatch(loginSuccess(payload));
                const { location } = getState().router;
                const searchParams = new URLSearchParams(location.search);
                dispatch(replace(searchParams.get('redirectUrl') || '/'));
            })
            .catch(() => {
                dispatch({ type: ActionTypes.VerifyLoginFailure });
                toastr.error(
                    'Error',
                    'You cannot access our system. Please contact admin'
                );
            });
    };
}

export function loginSuccess(payload) {
    return {
        type: ActionTypes.LoginSuccess,
        payload
    };
}

export function logout() {
    return (dispatch, getState) => {
        const { location } = getState().router;
        const redirectUrl = encodeURIComponent(
            location.pathname + location.search
        );
        dispatch(
            replace({
                pathname: '/login',
                search: `redirectUrl=${redirectUrl}`
            })
        );
        sessionStorage.removeItem('auth');
        dispatch(logoutSuccess());
    };
}

export function logoutSuccess() {
    return {
        type: ActionTypes.LogoutSuccess
    };
}
