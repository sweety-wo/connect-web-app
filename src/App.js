import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import ReduxToastr from 'react-redux-toastr';
import './App.scss';
import store from './store/store';
import history from './store/history';
import Login from './auth/Login';
import Process from './process/Process';
import ProcessDetail from './process/ProcessDetail';
import People from './people/People';
import PeopleDetail from './people/PeopleDetail';
import Skills from './skills/Skills';
import SkillDetail from './skills/SkillDetail';
import Prerequisites from './pre-requisites/Pre-requisites';
import PrerequisiteDetail from './pre-requisites/PrerequisiteDetail';
import Import from './import/Import';
import Connect from './connect/Connect';

function App() {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path="/" exact>
                        <Process />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/process/:id">
                        <ProcessDetail />
                    </Route>
                    <Route path="/people/:id">
                        <PeopleDetail />
                    </Route>
                    <Route path="/people">
                        <People />
                    </Route>
                    <Route path="/skills/:id">
                        <SkillDetail />
                    </Route>
                    <Route path="/skills">
                        <Skills />
                    </Route>
                    <Route path="/prerequisites/:id">
                        <PrerequisiteDetail />
                    </Route>
                    <Route path="/prerequisites">
                        <Prerequisites />
                    </Route>
                    <Route path="/connect">
                        <Connect />
                    </Route>
                    <Route path="/import">
                        <Import />
                    </Route>
                </Switch>
            </ConnectedRouter>
            <ReduxToastr />
        </Provider>
    );
}

export default App;
