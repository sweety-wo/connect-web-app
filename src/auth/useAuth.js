import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, logout } from './actions';

export default function useAuth(shouldAuth) {
    const authState = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (shouldAuth) {
            if (!authState.tokenId) {
                const auth = sessionStorage.getItem('auth');
                if (!auth) {
                    dispatch(logout());
                } else {
                    const payload = JSON.parse(auth);
                    if (Date.now() > payload.expiresAt) {
                        dispatch(logout());
                    } else {
                        dispatch(loginSuccess(payload));
                    }
                }
            } else if (Date.now() > authState.expiresAt) {
                dispatch(logout());
            }
        }
    }, [authState, dispatch, shouldAuth]);

    return authState;
}
