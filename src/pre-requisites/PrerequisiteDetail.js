import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Layout from '../layout/Layout';
import { Loader, Segment, Button } from 'semantic-ui-react';
import { useHistory, useParams } from 'react-router-dom';
import './PrerequisiteDetail.scss';

export default function PrerequisiteDetail() {
    const { id } = useParams();
    const { loading, data, error } = useQuery(GET_PREREQUISITE, {
        variables: {
            id
        }
    });
    const history = useHistory();

    return (
        <Layout shouldAuth>
            <div className="prerequisites">
                <div className="prerequisites__title">
                    <h1>Prerequisite Detail</h1>
                </div>
                {loading ? (
                    <Loader active />
                ) : error ? (
                    <Segment>There was an error while getting data</Segment>
                ) : (
                    <div className="prerequisites-detail">
                        <div className="prerequisites-detail__meta">
                            <div>ID</div>
                            <div>{data.Prerequisite[0].id}</div>
                            <div>Name</div>
                            <div>{data.Prerequisite[0].name}</div>
                        </div>
                        <h2>Processes</h2>
                        <ul className="prerequisites-detail__list">
                            {data.Prerequisite[0].processes.map(s => (
                                <li key={s.id}>{s.name}</li>
                            ))}
                        </ul>
                        <h2>People</h2>
                        <ul className="prerequisites-detail__list">
                            {data.Prerequisite[0].people.map(s => (
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

const GET_PREREQUISITE = gql`
    query prerequisiteQuery($id: ID) {
        Prerequisite(id: $id) {
            id
            name
            processes {
                id
                name
            }
            people {
                id
                name
            }
        }
    }
`;
