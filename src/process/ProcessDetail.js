import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Layout from '../layout/Layout';
import { Loader, Segment, Button } from 'semantic-ui-react';
import { useHistory, useParams } from 'react-router-dom';
import './ProcessDetail.scss';

export default function ProcessDetail() {
    const { id } = useParams();
    const { loading, data, error } = useQuery(GET_PROCESS, {
        variables: {
            id
        }
    });
    const history = useHistory();

    return (
        <Layout shouldAuth>
            <div className="process">
                <div className="process__title">
                    <h1>Process Detail</h1>
                </div>
                {loading ? (
                    <Loader active />
                ) : error ? (
                    <Segment>There was an error while getting data</Segment>
                ) : (
                    <div className="process-detail">
                        <div className="process-detail__meta">
                            <div>ID</div>
                            <div>{data.Process[0].id}</div>
                            <div>Name</div>
                            <div>{data.Process[0].name}</div>
                        </div>
                        <h2>Skills</h2>
                        <ul className="process-detail__list">
                            {data.Process[0].skills.map(s => (
                                <li key={s.id}>{s.name}</li>
                            ))}
                        </ul>
                        <h2>Pre-requisites</h2>
                        <ul className="process-detail__list">
                            {data.Process[0].prerequisites.map(s => (
                                <li key={s.id}>{s.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <Button onClick={() => history.goBack()}>Back</Button>
            </div>
        </Layout>
    );
}

const GET_PROCESS = gql`
    query processQuery($id: ID) {
        Process(id: $id) {
            id
            name
            skills {
                id
                name
            }
            prerequisites {
                id
                name
            }
        }
    }
`;
