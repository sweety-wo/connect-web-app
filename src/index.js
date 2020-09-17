import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './util/apolloClient';

const Main = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
