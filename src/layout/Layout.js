import React from 'react';
import Header from './Header';
import LeftNav from './LeftNav';
import './Layout.scss';

export default function Layout({ shouldAuth, children }) {
    return (
        <div className="layout">
            <Header shouldAuth={shouldAuth} />
            <LeftNav />
            <main className="main">{children}</main>
        </div>
    );
}
