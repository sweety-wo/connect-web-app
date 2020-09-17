import React from 'react';
import { Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleLogout } from 'react-google-login';
import './Header.scss';
import useAuth from '../auth/useAuth';
import { logout } from '../auth/actions';
import { GoogleClientId } from '../constants/Constants';

export default function Header({ shouldAuth }) {
    const { tokenId, name, imageUrl } = useAuth(shouldAuth);
    const dispatch = useDispatch();

    function handleLogout() {
        dispatch(logout());
    }

    return (
        <div className="header">
            <div className="header__title">Skills Matrix</div>
            <div className="header__user">
                {tokenId ? (
                    <Popup
                        hoverable
                        position="bottom right"
                        trigger={<img src={imageUrl} alt={name} />}
                    >
                        <div className="header__popover">
                            <div>{name}</div>
                            <GoogleLogout
                                clientId={GoogleClientId}
                                theme="dark"
                                buttonText="Logout"
                                onLogoutSuccess={handleLogout}
                            ></GoogleLogout>
                        </div>
                    </Popup>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </div>
    );
}
