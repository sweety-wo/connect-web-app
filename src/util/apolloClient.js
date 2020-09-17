import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_URI,
    request: operation => {
        const auth = sessionStorage.getItem('auth');
        if (!auth) return;
        const { tokenId } = JSON.parse(auth);
        operation.setContext({
            headers: {
                authorization: `Bearer ${tokenId}`
            }
        });
    }
});

export default client;
