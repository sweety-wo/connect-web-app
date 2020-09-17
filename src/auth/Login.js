import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import './Login.scss';
import { login } from './actions';
import { GoogleClientId } from '../constants/Constants';

export default function Login() {
    const dispatch = useDispatch();

    function handleSuccess(response) {
        const { tokenId, profileObj, tokenObj } = response;
        const { name, email, imageUrl } = profileObj;
        const { expires_at: expiresAt } = tokenObj;
        dispatch(login({ name, email, imageUrl, tokenId, expiresAt }));
    }

    function handleError(response) {
        console.log('error response', response);
    }

    function handleLoading() {
        console.log('loading');
    }

    return (
        <div className="login">
            <GoogleLogin
                clientId={GoogleClientId}
                scope="profile email"
                onSuccess={handleSuccess}
                onFailure={handleError}
                onRequest={handleLoading}
                offline={false}
                approvalPrompt="force"
                responseType="id_token"
                isSignedIn
                theme="dark"
            />
        </div>
    );
}
