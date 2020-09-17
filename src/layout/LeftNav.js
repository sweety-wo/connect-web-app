import React, { useEffect } from 'react';
import './LeftNav.scss';
import { Menu } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { setActiveItem } from './actions';

export default function LeftNav() {
    const dispatch = useDispatch();
    const activeItem = useSelector(store => store.menu.activeItem);
    const pathname = useSelector(store => store.router.location.pathname);

    useEffect(() => {
        if (pathname === '/' || pathname.includes('/process/')) {
            dispatch(setActiveItem('process'));
        }
        if (pathname.includes('/people')) {
            dispatch(setActiveItem('people'));
        }
        if (pathname.includes('/skills')) {
            dispatch(setActiveItem('skills'));
        }
        if (pathname.includes('/prerequisites')) {
            dispatch(setActiveItem('prerequisites'));
        }
        if (pathname.includes('/connect')) {
            dispatch(setActiveItem('connect'));
        }
        if (pathname.includes('/import')) {
            dispatch(setActiveItem('import'));
        }
        // eslint-disable-next-line
    }, []);

    function handleClick(e, data) {
        if (activeItem !== data.name) {
            dispatch(setActiveItem(data.name));
            let url;
            switch (data.name) {
                case 'process':
                    url = '/';
                    break;
                case 'people':
                    url = '/people';
                    break;
                case 'skills':
                    url = '/skills';
                    break;
                case 'prerequisites':
                    url = '/prerequisites';
                    break;
                case 'connect':
                    url = '/connect';
                    break;
                case 'import':
                    url = '/import';
                    break;
                default:
                    url = '/';
            }
            dispatch(push(url));
        }
    }

    return (
        <div className="left-nav">
            <Menu vertical>
                <Menu.Item
                    name="process"
                    active={activeItem === 'process'}
                    onClick={handleClick}
                >
                    Process Library
                </Menu.Item>
                <Menu.Item
                    name="people"
                    active={activeItem === 'people'}
                    onClick={handleClick}
                >
                    People
                </Menu.Item>
                <Menu.Item
                    name="skills"
                    active={activeItem === 'skills'}
                    onClick={handleClick}
                >
                    Skills
                </Menu.Item>
                <Menu.Item
                    name="prerequisites"
                    active={activeItem === 'prerequisites'}
                    onClick={handleClick}
                >
                    Prerequisites
                </Menu.Item>
                <Menu.Item
                    name="connect"
                    active={activeItem === 'connect'}
                    onClick={handleClick}
                >
                    Connect
                </Menu.Item>
                <Menu.Item
                    name="import"
                    active={activeItem === 'import'}
                    onClick={handleClick}
                >
                    Import
                </Menu.Item>
            </Menu>
        </div>
    );
}
